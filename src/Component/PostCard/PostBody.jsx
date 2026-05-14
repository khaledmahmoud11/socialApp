import React, { useContext, useRef, useState } from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import { BiRepost } from 'react-icons/bi'
import { FaRegComment } from 'react-icons/fa'
import { FaSpinner } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { FaHourglassEnd } from "react-icons/fa";
import { Spinner } from '@heroui/react';
import { FaShare } from "react-icons/fa";

import { Link } from 'react-router'
import { createComment, getAllComments } from '../../services/CommentServices'
import { Button, Input } from '@heroui/react';
import { editPost, sharePost } from '../../services/PostServicies';
import { createLike } from '../../services/LikeServices';
import { AuthContext } from '../../Context/AuthContext';
import { RiShareBoxFill } from "react-icons/ri";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  
} from "@heroui/react";
import { toast } from 'react-toastify';
export default function PostBody({ image , body , likesCount , likes , id , sharesCount , comments ,setComments , isEditing , setIsEditing , loadingComment , setloadingComment , name , username ,isShare , sharedPost ,setPosts  }) {
  
  const photoComment = useRef();
  const inputbody = useRef();

  let {profileData}=useContext(AuthContext)
  
  const [displayPhoto, setDisplayPhoto] = useState("")
  const [sendingPhoto, setSendingPhoto] = useState("")
  const [commentBody, setCommentBody] = useState("")
  const [numOfLikes, setNumOfLikes] = useState(likesCount);
  const [likesList, setLikesList] = useState(likes);


  
  const [commentloading, setCommentloading] = useState(false)
  const [likeloading, setLikeloading] = useState(false)
  const [loadingEdit, setLoadingEdit] = useState(false)
  const [postBody, setPostBody] = useState(body);

  const [shareBody, setShareBody] = useState("")
  
  async function handleUpdatePost(id){
        try {
          setLoadingEdit(true)
            const formData = new FormData();
            if(commentBody){
              formData.append("body",commentBody)
            }
            const response = await editPost(id,formData);
            console.log(response,"Updating post");
            setPostBody(commentBody)
            
        } catch (error) {
            console.log(error)
        }finally{
          setCommentBody("")
          setLoadingEdit(false)
          setIsEditing(false)
          
        }
    }

  function clickPhotoIcon(){
    photoComment.current.click();
  }
  function selectPhotoComment(){
    setSendingPhoto(photoComment.current.files[0])
    setDisplayPhoto(URL.createObjectURL(photoComment.current.files[0]))
  }
  function deleteDisplayPhoto(){
    setSendingPhoto("")
    setDisplayPhoto("")
  }

  async function handleSubmitComment(id){

    try{
      setCommentloading(true)
      const formData = new FormData();
      if(commentBody){
        formData.append("content",commentBody)
      }
      if(sendingPhoto){
        formData.append("image",sendingPhoto)
      }
      const response = await createComment(id,formData)
      console.log(response)
      setCommentBody("")
      setDisplayPhoto("")
      setSendingPhoto("")
      fetchAllComments(id)
    }catch(error){
      console.log(error)
    }finally{
      setCommentloading(false)
    }

  }

  async function fetchAllComments(postId){
    try{
      setloadingComment(true)
      const response = await getAllComments(postId);
      console.log(response)
      console.log(response.data.data.comments)
      setComments(response.data.data.comments)
    }catch(error){
      console.log(error)
    }finally{
      setloadingComment(false)
    }
  }



  async function handleAddLike(postId){
    try {
      setLikeloading(true);
      const response = await createLike(postId);
      console.log(response,"response after like");
      setNumOfLikes(response.data.data.likesCount);
      setLikesList(response.data.data.post.likes)
    } catch (error) {
      console.log(error)
    }finally{
      setLikeloading(false)
    }
  }

  const [shareLoading, setShareLoading] = useState(false)
  async function fetchSharePost(postId){
      try {
        setShareLoading(true)
        const formData = new FormData();
          formData.append("body",shareBody);
        const response = await sharePost(postId,formData);
        console.log(response,"response for share Post ");
        toast.success(response.data.message);
        const newPost = response.data.data.post;
        setIsOpen(false)
        setPosts((prevPosts) => [newPost, ...prevPosts]);
        setShareBody("");
        inputbody.current.value = "";
      } catch (error) {
        console.log(error)
      }finally{
        setShareLoading(false)
      }
  
    }

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="postBody px-4">
        
        {isEditing ? <textarea value={postBody} onChange={(e)=>setPostBody(e.target.value)} className='w-full h-24  outline-0 border-1 border-gray-300 rounded-xl shadow-md'> </textarea>  : <p className='px-3 py-2'> {postBody} </p> }
        
        {isEditing && <div className='w-full text-end my-2 '>
          <>
            <Button className=' font-bold mx-2 ' onClick={()=>setIsEditing(false)} >Cancel</Button>
            <Button isLoading={loadingEdit} className='bg-blue-600 text-white font-bold' onClick={()=>handleUpdatePost(id)} >Save</Button>
          </>
        </div> }
        {isShare && <>
          <div className=' bg-gray-100 border border-gray-300 rounded-xl w-full p-3 my-3 '>
              <div className="flex items-center justify-between ">
                <div className='flex items-center gap-2'>
                  <img src={sharedPost.user.photo} alt="" className='w-10 h-10 rounded-full' />
                  <div>
                    <p className='truncate text-sm font-bold text-slate-900 w-20 sm:w-full '>{sharedPost.user.name}</p>
                    <p className='truncate text-xs text-slate-500'>@{sharedPost.user.username}</p>
                  </div>
                </div>
                <Link 
                  to={`/PostDetails/${sharedPost._id}`} 
                  className='flex items-center justify-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-blue-500 hover:bg-blue-300'>
                    Original Post <RiShareBoxFill />
                </Link>
              </div>
              <div className="p-3">
                {sharedPost.body  && <p className='whitespace-pre-wrap text-sm leading-relaxed text-slate-800'>{sharedPost.body}</p> }
                {sharedPost.image  && <img src={sharedPost.image} alt="post_img" className='w-full h-100 object-cover' />  }
              </div>
              
          </div>
        
          </>
        }
          
        {image && <img src={image} alt="post_img" className='w-full h-80 object-cover' /> }
        <div className='flex justify-between items-center p-2'>
          <div className='flex items-center gap-2'>
            <span className='bg-blue-600 rounded-full p-1'> <AiOutlineLike className='text-white' /> </span>
            <p>{numOfLikes} Likes</p>
          </div>
          <div className='flex gap-3 items-center'>
            <span className='flex items-center gap-2 text-sm text-gray-600 '> <FaShare size={12} /> {sharesCount} share</span>
            <button onClick={()=>fetchAllComments(id)} disabled={loadingComment}  className="bg-transparent  cursor-pointer flex items-center gap-2 text-sm text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"> {comments.length} comments </button>
            <Link to={`/postDetails/${id}`} className='text-blue-600 cursor-pointer text-sm '> View Details</Link>
          </div>
        </div>
        <div className='actions p-4 flex justify-around items-center'>
          <button disabled={likeloading} onClick={()=>handleAddLike(id)} className='bg-transparent flex items-center gap-2 cursor-pointer'> {likeloading ?  <Spinner size="sm"/> : <AiOutlineLike className={likesList?.includes(profileData.id) ? "text-blue-600" : ""}/> }  {likesList?.includes(profileData.id) ? "Liked" : "Like"}</button>
          <button onClick={()=>fetchAllComments(id)} disabled={loadingComment}  className="bg-transparent flex items-center gap-2 cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed"> <FaRegComment /> {loadingComment ? "loading..."   : "Comment"} </button>
          <Button onPress={() => setIsOpen(true)} variant="secondary"><FaShare /> Share</Button>
          <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader>Share Post</ModalHeader>
                  <hr className='border-gray-200'/>
                  <ModalBody>
                    <textarea
                      value={shareBody}
                      onChange={(e)=>setShareBody(e.target.value)}   
                      name="" id=""  
                      placeholder="Say Something About This..." 
                      className='resize-none w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white'
                      ref={inputbody}
                      >
                    </textarea>
                    <div className='p-4 bg-gray-200 border-gray-300 border rounded-xl space-y-3'>
                      <div className='flex items-center gap-2'>
                        <img src={profileData.photo} alt="" className='w-10 h-10 rounded-full' />
                        <div>
                          <p className='truncate text-sm font-bold text-slate-900'>{name}</p>
                          <p className='truncate text-xs font-semibold text-slate-500'>{username}</p>
                        </div>
                      </div>
                      <div>
                        <p>{body}</p>
                        {image  ? <img src={image} alt='post_image' className='w-full h-50 object-cover'/>  :  <></> }

                      </div>


                    </div>
                  </ModalBody>

                  <ModalFooter>
                    <Button onPress={onClose}>Close</Button>
                    <Button 
                      className='bg-blue-500 text-white font-bold flex items-center gap-2 '
                      onClick={()=>fetchSharePost(id)}
                      >
                        {shareLoading ? <Spinner size='sm' color='text-white'/> : <FaShare /> }  Share
                    </Button>
                    
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>



        <div className=' p-4 border-2 border-transparent focus-within:border-2 focus-within:border-gray-300 rounded-xl'>
          <Input
            placeholder='Write a Comment '
            className='mb-3'
            onChange={(e)=>setCommentBody(e.target.value)}
            value={commentBody}          
          />

          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-3'>
              <span onClick={()=>clickPhotoIcon()} className='cursor-pointer' > <FaImage /> </span>
              <Input 
                type='file' 
                ref={photoComment} 
                className='hidden'
                onInput={()=>selectPhotoComment()}
              />
              <span> <MdOutlineEmojiEmotions /> </span>
            </div>
            <div>
              <button disabled={!commentBody && !sendingPhoto} onClick={()=>handleSubmitComment(id)} className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-blue-300 ${!commentloading ? 'text-blue-600 bg-white' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}> {!commentloading ? <IoSend /> :    <Spinner size='sm' />  }  </button>
            </div>
            
          </div>
          <div>
            {displayPhoto  &&  
              <div className='relative'>
                <img src={displayPhoto} alt='commentPhoto' className='w-full h-50 object-cover rounded-xl' />
                <span onClick={()=>deleteDisplayPhoto()} className='bg-gray-900 rounded-full p-2 text-white absolute top-2.5 right-2.5 cursor-pointer'> <IoCloseSharp /></span>
              </div> 
            }
          </div>   
        </div>
        
          
      </div>
      
    </>
  )
}
