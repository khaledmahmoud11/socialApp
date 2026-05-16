import React, { useRef, useState } from 'react'
import { BiRepost } from 'react-icons/bi'
import { FaImage } from "react-icons/fa6";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { FaHourglassEnd } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { AiOutlineLike } from 'react-icons/ai'
import { Spinner } from '@heroui/react';

import { Link } from 'react-router'
import { createComment, getAllComments } from '../../services/CommentServices'
import { Button, Input } from '@heroui/react';
import { editPost} from '../../services/PostServicies';
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
import CreateComment from '../CreateComment/CreateComment';
import PostActions from '../PostActions/PostActions';
export default function PostBody({post , comments  ,setComments , isEditing , setIsEditing , loadingComment , setloadingComment ,setPosts  }) {
  


  const photoComment = useRef();
  const [numOfLikes, setNumOfLikes] = useState(post.likesCount);
  const [commentBody, setCommentBody] = useState("")
  const [likesList, setLikesList] = useState(post.likes);
  const [displayPhoto, setDisplayPhoto] = useState("")
  const [sendingPhoto, setSendingPhoto] = useState("")
  const [commentloading, setCommentloading] = useState(false)
  const [loadingEdit, setLoadingEdit] = useState(false)
  const [postBody, setPostBody] = useState(post.body);

  
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
      toast.success(response.data.message)
      setComments(prev => [
        response.data.data.comment,
        ...prev
      ]);
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



  



  return (
    <>
      <div className="postBody px-4">
        
        {isEditing ? <textarea value={postBody} onChange={(e)=>setPostBody(e.target.value)} className='w-full h-24  outline-0 border-1 border-gray-300 rounded-xl shadow-md'> </textarea>  : <p className='px-3 py-2'> {postBody} </p> }
        
        {isEditing && <div className='w-full text-end my-2 '>
          <>
            <Button className=' font-bold mx-2 ' onClick={()=>setIsEditing(false)} >Cancel</Button>
            <Button isLoading={loadingEdit} className='bg-blue-600 text-white font-bold' onClick={()=>handleUpdatePost(post.id)} >Save</Button>
          </>
        </div> }
        {post.isShare && <>
          <div className=' bg-gray-100 border border-gray-300 rounded-xl w-full p-3 my-3 '>
              <div className="flex items-center justify-between ">
                <div className='flex items-center gap-2'>
                  <img src={post.sharedPost?.user.photo} alt="" className='w-10 h-10 rounded-full' />
                  <div>
                    <p className='truncate text-sm font-bold text-slate-900 w-20 sm:w-full '>{post.sharedPost?.user.name}</p>
                    <p className='truncate text-xs text-slate-500'>@{post.sharedPost?.user.username}</p>
                  </div>
                </div>
                <Link 
                  to={`/PostDetails/${post.sharedPost?._id}`} 
                  className='flex items-center justify-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-blue-500 hover:bg-blue-300'>
                    Original Post <RiShareBoxFill />
                </Link>
              </div>
              <div className="p-3">
                {post.sharedPost?.body  && <p className='whitespace-pre-wrap text-sm leading-relaxed text-slate-800'>{post.sharedPost?.body}</p> }
                {post.sharedPost?.image  && <img src={post.sharedPost?.image} alt="post_img" className='w-full h-100 object-cover' />  }
              </div>
              
          </div>
        
          </>
        }
          
        {post.image && <img src={post.image} alt="post_img" className='w-full h-80 object-cover' /> }
        <div className='flex justify-between items-center p-2'>
          <div className='flex items-center gap-2'>
            <span className='bg-blue-600 rounded-full p-1'> <AiOutlineLike className='text-white' /> </span>
            <p>{numOfLikes} Likes</p>
          </div>
          <div className='flex gap-3 items-center'>
            <span className='flex items-center gap-2 text-sm text-gray-600 '> <FaShare size={12} /> {post.sharesCount} share</span>
            <button onClick={()=>fetchAllComments(post.id)} disabled={loadingComment}  className="bg-transparent  cursor-pointer flex items-center gap-2 text-sm text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"> {comments.length ===0 ? post.commentsCount  :comments.length }  comments </button>
            <Link to={`/postDetails/${post.id}`} className='text-blue-600 cursor-pointer text-sm '> View Details</Link>
          </div>
        </div>

        <PostActions 
          setNumOfLikes={setNumOfLikes}  
          likesList={likesList} 
          post={post} 
          fetchAllComments={fetchAllComments}
          setLikesList={setLikesList}
          setPosts={setPosts} 
          loadingComment={loadingComment}
        />



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
                        <button disabled={!commentBody && !sendingPhoto} onClick={()=>handleSubmitComment(post.id)} className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-blue-300 ${!commentloading ? 'text-blue-600 bg-white' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}> {!commentloading ? <IoSend /> :    <Spinner size='sm' />  }  </button>
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
