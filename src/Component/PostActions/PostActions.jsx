import React, { useContext, useRef, useState } from 'react'
import { createLike } from '../../services/LikeServices';
import { Button } from '@heroui/react';
import {Modal,ModalContent,ModalHeader,ModalBody,ModalFooter} from "@heroui/react";
import { toast } from 'react-toastify';
import { sharePost } from '../../services/PostServicies';
import { AuthContext } from '../../Context/AuthContext';
import { AiOutlineLike } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import { FaShare } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa6";
import { Spinner } from '@heroui/react';
import PostFooter from '../PostCard/PostFooter';

export default function PostActions({ setNumOfLikes , setNumOfComments,setNumOfShares, likesList , setLikesList , post, fetchAllComments , setPosts ,loadingComment,setloadingComment ,comments,setComments,commentBody,setCommentBody}) {

    const inputbody = useRef();
    const {profileData} = useContext(AuthContext)
    const [likeloading, setLikeloading] = useState(false)
    const [shareLoading, setShareLoading] = useState(false)
    const [shareBody, setShareBody] = useState("")

    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [isShareOpen, setIsShareOpen] = useState(false);
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
    async function fetchSharePost(postId){
        try {
            setShareLoading(true)
            const formData = new FormData();
            formData.append("body",shareBody);
            const response = await sharePost(postId,formData);
            toast.success(response.data.message);
            const newPost = response.data.data.post;
            setIsShareOpen(false)
            setPosts((prevPosts) => [newPost, ...prevPosts]);
            setNumOfShares((prevCount) => (prevCount || 0) + 1);
    
        } catch (error) {
            toast.error(error.response?.data?.message );
        }finally{
            setShareLoading(false)
            setShareBody("");
            inputbody.current.value = "";
        }
        }


    return (
        <>
            <div className='actions p-4 flex justify-around items-center'>
                <button 
                    disabled={likeloading} 
                    onClick={()=>handleAddLike(post._id)} 
                    className='bg-transparent flex items-center gap-2 cursor-pointer'
                > 
                        {likeloading ?
                            <Spinner size="sm"/> 
                        :   
                            <AiOutlineLike className={likesList?.includes(profileData.id) ? "text-blue-600" : ""}/> 
                        }  

                        {likesList?.includes(profileData.id) ?
                            "Liked" 
                        :   
                            "Like"
                        }
                </button>
                
                <Button 
                    onClick={() => {
                        fetchAllComments(post._id);
                        setIsCommentsOpen(true);
                    }}
                    disabled={loadingComment}  
                    className="bg-transparent flex items-center gap-2 cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed"
                > 
                    <FaRegComment /> {loadingComment ? "loading..."   : "Comment"} 
                </Button>

                <Modal size="2xl"  isOpen={isCommentsOpen} onOpenChange={setIsCommentsOpen}>
                    <ModalContent >
                        
                    
                        <>
                        <ModalHeader>Comments</ModalHeader>
                        <hr className='border-gray-200'/>
                        <ModalBody>

                            <PostFooter 
                                userId={post?.user._id} 
                                postId={post.id} 
                                comments={comments} 
                                setComments={setComments}  
                                setloadingComment={setloadingComment} 
                                loadingComment={loadingComment}
                                commentBody={commentBody}
                                setCommentBody={setCommentBody}
                                setNumOfComments={setNumOfComments}
                                
                            />
                        </ModalBody>

                        </>
                    
                    </ModalContent>
                </Modal>
                
                
                


                <Button onPress={() => setIsShareOpen(true)} variant="secondary"><FaShare /> Share</Button>
                <Modal isOpen={isShareOpen} onOpenChange={setIsShareOpen}>
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
                                <p className='truncate text-sm font-bold text-slate-900'>{post.user.name}</p>
                                <p className='truncate text-xs font-semibold text-slate-500'>{post.user.username}</p>
                                </div>
                            </div>
                            <div>
                                <p>{post.body}</p>
                                {post.image  ? <img src={post.image} alt='post_image' className='w-full h-50 object-cover'/>  :  <></> }

                            </div>


                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <Button onPress={onClose}>Close</Button>
                            <Button 
                            className='bg-blue-500 text-white font-bold flex items-center gap-2 '
                            onClick={()=>fetchSharePost(post.id)}
                            >
                                {shareLoading ? <Spinner size='sm' color='text-white'/> : <FaShare /> }  Share
                            </Button>
                            
                        </ModalFooter>
                        </>
                    )}
                    </ModalContent>
                </Modal>
                </div>
        </>
    )
}
