import React, { useState } from 'react'
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
import { getAllComments } from '../../services/CommentServices'
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
import PostActions from '../PostActions/PostActions';
import CreateComment from '../CommentComponent/CreateComment/CreateComment';
export default function PostBody({post , comments  ,setComments , isEditing , setIsEditing , loadingComment , setloadingComment ,setPosts,commentBody,setCommentBody  }) {
  


  const [numOfLikes, setNumOfLikes] = useState(post.likesCount);
  const [likesList, setLikesList] = useState(post.likes);
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
          
        {post.image && <img src={post.image} alt="post_img" className='w-full  object-cover' /> }
        <div className='flex justify-between items-center p-2'>
          <div className='flex items-center gap-2'>
            <span className='bg-blue-600 rounded-full p-1'> <AiOutlineLike className='text-white' /> </span>
            <p className='text-xs sm:text-sm  transition cursor-pointer hover:text-[#1877f2] hover:underline'>{numOfLikes} Likes</p>
          </div>
          <div className='text-xs sm:text-sm flex gap-2 items-center'>
            <button 
              onClick={()=>fetchAllComments(post.id)} 
              disabled={loadingComment}  
              className="bg-transparent  cursor-pointer text-xs sm:text-sm flex gap-1 items-center text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
            > 
              {comments.length ===0 ? post.commentsCount  :comments.length }  comments 
            </button>
            
            <span className='text-xs sm:text-sm flex gap-1 items-center text-gray-600 '>  {post.sharesCount} share</span>
            
            <Link to={`/postDetails/${post.id}`} className='text-[10px] sm:text-xs rounded-md px-2 py-1  font-bold text-[#1877f2] hover:bg-[#e7f3ff] '> View Details</Link>
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
          comments={comments} 
          setComments={setComments}  
          setloadingComment={setloadingComment}
          commentBody={commentBody}
          setCommentBody={setCommentBody} 
        />




        
          
      </div>
      
    </>
  )
}
