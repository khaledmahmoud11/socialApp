import React, { useContext, useRef, useState } from 'react'
import { defualtAvatar, formatPostDate } from '../../Liberary/HelperFunctions/HelperFunctions'
import { BsThreeDots } from 'react-icons/bs'
import { AuthContext } from '../../Context/AuthContext'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Spinner} from "@heroui/react";
import { BookmarkPost, DeletePost } from '../../services/PostServicies';
import { Link } from 'react-router';
import { FaPencilAlt, FaTrash  } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { toast } from 'react-toastify';
import { GoBookmarkSlash } from "react-icons/go";


export default function PostHeader({photo , id , name , username ,  privacy , createdAt , userId  , setIsEditing ,bookmarked ,setPosts,activeTab   }) {
    let {profileData}=useContext(AuthContext);
    const [loadingSave, setLoadingSave] = useState(false);

    const dialogRef = useRef();
    function openDialog() {
        dialogRef.current.showModal();
    }
    
    async function fetchDeletePost(id){
        try {
            const response = await DeletePost(id);
            toast.success(response.data.message)
            dialogRef.current.close(); 

            setPosts(prevPosts => prevPosts.filter(post => post._id !== id));

        } catch (error) {
            console.log(error)
        }
    }
    async function fetchBookmarkPost(postId){
        try {
            setLoadingSave(true);
            const response = await BookmarkPost(postId);
            if(response.data.data.bookmarked){
                toast.success("Post saved successfully")
            }else{
                toast.success("Post unsaved successfully")
            }
            const isNowBookmarked = response.data.data.bookmarked;
            setPosts(prevPosts => {
                if (activeTab === "saved" && !isNowBookmarked) {
                    return prevPosts.filter(post => post._id !== postId);
                }
                return prevPosts.map(post => 
                    post._id === postId ? { ...post, bookmarked: isNowBookmarked } : post
                );
            });
        } catch (error) {
            console.log(error)
        }finally{
            setLoadingSave(false);
        }
    }
    

    return (
    <>   
                <div>
                    <el-dialog>
                    <dialog  ref={dialogRef} aria-labelledby="dialog-title" class="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent">
                        <el-dialog-backdrop class="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"></el-dialog-backdrop>

                        <div tabindex="0" class="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0">
                        <el-dialog-panel class="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
                            <div class="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div class="sm:flex sm:items-start">
                                <div class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-500/10 sm:mx-0 sm:size-10">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 text-red-400">
                                    <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                </div>
                                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 id="dialog-title" class="text-base font-semibold text-white">Confirm action</h3>
                                <div class="mt-2">
                                    <p class="text-sm text-gray-400 font-bold">Delete this post?</p>
                                    <p class="text-sm text-gray-400">This post will be permanently removed from your profile and feed.</p>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div class="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button type="button" onClick={() => fetchDeletePost(id)} class="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400 sm:ml-3 sm:w-auto">Delete Post</button>
                            <button type="button" onClick={() => dialogRef.current.close()} class="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto">Cancel</button>
                            </div>
                        </el-dialog-panel>
                        </div>
                    </dialog>
                    </el-dialog>

                </div>


                <div className="postHeader px-4 py-2">
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-2 '>
                            <Link to={`/profile/${userId}`}>
                                <img src={ defualtAvatar(photo)} alt="" className='w-10 h-10 rounded-full hover:opacity-75 transition-all duration-200' />
                            </Link>
                            <div>
                                <Link to={`/profile/${userId}`} className='w-fit bg-green-700' >
                                    <h3 className='font-bold text-sm hover:underline transition-all duration-200 w-fit '> {name} </h3>
                                </Link>
                                <div className='flex gap-3'>
                                    {username && <p className='text-gray-500 text-sm '>{username}</p> }                                
                                    <span className='text-gray-500 text-sm'> {formatPostDate(createdAt)} </span>
                                    <span className='text-gray-500 text-sm'> {privacy} </span>
                                </div>
                            </div>
                        </div>
                        
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button variant="bordered"> <BsThreeDots /> </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Static Actions">
                                    <DropdownItem onClick={()=>fetchBookmarkPost(id)} key="edit" className='cursors pointer' >
                                        <div className="flex items-center gap-2">
                                            {loadingSave ? <Spinner size='sm' /> : bookmarked ? <GoBookmarkSlash /> : <FaBookmark /> }  {bookmarked ? "Unsave" : "Save"}   Post
                                        </div>
                                    </DropdownItem>
                                    {userId === profileData?.id && <>
                                        <DropdownItem key="edit" className='cursors pointer' onClick={()=> setIsEditing(true) } >
                                            <div className="flex items-center gap-2">
                                                <FaPencilAlt /> Edit Post
                                            </div>
                                        </DropdownItem>
                                        <DropdownItem key="delete" className="text-danger cursor-pointer" onClick={openDialog} color="danger" >
                                            <button command="show-modal" commandfor={`dialog-${id}`} className='flex items-center gap-2' >
                                                <FaTrash /> Delete Post
                                            </button>
                                        </DropdownItem>
                                    </>  }
                                </DropdownMenu>
                                </Dropdown>
                        
                        
                    </div>
                </div>
    </>
  )
}
