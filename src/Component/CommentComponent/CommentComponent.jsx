import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import { createReply, DeleteComment, editComment, getAllReplies, likeComment } from '../../services/CommentServices';
import { toast } from 'react-toastify';
import { FaImage } from "react-icons/fa6";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { FaHourglassEnd } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import EditOrDeleteCommentBTn from '../EditOrDeleteCommentBTn/EditOrDeleteCommentBTn';
import { Button, Input, Spinner } from '@heroui/react';
import CreateComment from '../CreateComment/CreateComment';

export default function CommentComponent({comment,postId,userId,setComments}) {

    let {profileData}=useContext(AuthContext)
    const [replayStatement, setreplayStatement] = useState(null);
    const [replyBody, setReplyBody] = useState("")
    const [editCommentId, setEditCommentId] = useState(null)
    const [newContent, setNewContent] = useState("")
    const [laodingChange, setLaodingChange] = useState(false)


    const [replyloading, setReplyloading] = useState(false)

    const [replies, setReplies] = useState([])

    async function fetchAllReplies(postId,commentID){
        try{
        setReplyloading(true)
        const response = await getAllReplies(postId,commentID);
        setReplies(response.data.data.replies)

        }catch(error){
        console.log(error)
        }finally{
        setReplyloading(false)
        }
    }
    async function handleSubmitReply(postId, commentID, {
        text,
        image,
        reset
    }) {

        try {

            const formData = new FormData();

            if (text) {
                formData.append("content", text)
            }

            if (image) {
                formData.append("image", image)
            }

            const response = await createReply(
                postId,
                commentID,
                formData
            )

            setReplies(prev => [
                response.data.data.reply,
                ...prev
            ])

            reset()

        } catch (error) {
            console.log(error)
        }
    }
    async function handleLikeReply(postId,commentID){
        try {
            setisLoadingLiking(commentID);
            const response = await likeComment(postId,commentID);
            console.log(response,"after liking reply");
            setReplies(prev =>
                prev.map(r =>
                    r._id === response.data.data.comment._id
                        ? response.data.data.comment
                        : r
                )
            );
        } catch (error) {
            console.log(error)
        }finally{
            setisLoadingLiking(null)
        }
    }

    const [isLoadingLiking, setisLoadingLiking] = useState(null)
    async function handleLikeComment(postId,commentID){
        try {
            setisLoadingLiking(commentID);
            const response = await likeComment(postId,commentID);
            console.log(response,"after liking reply");
            setComments(prev =>
                prev.map(r =>
                    r._id === response.data.data.comment._id
                        ? response.data.data.comment
                        : r
                )
            );
        } catch (error) {
            console.log(error)
        }finally{
            setisLoadingLiking(null)
        }
    }
    async function handleDeleteComment( postId , commentId ){
        try {
            const response = await DeleteComment( postId , commentId);
            setComments(prev => prev.filter(c => c._id !== commentId));
            setReplies(prev => prev.filter(c => c._id !== commentId));

            toast.success(response.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    function changeInput(comment){
        setEditCommentId(comment._id);
        setNewContent(comment.content)
    }
    function handleCancelEditing(){
        setEditCommentId(null)
    }


    async function handleEditComment( postId , commentId){
        try{
            setLaodingChange(true)
            const formData = new FormData();
            if(newContent){
                formData.append("content",newContent)
            }
            const response = await editComment( postId , commentId  , formData )
            setComments(prev => prev.map(c => c._id === commentId ? {...c, content: newContent} : c));
            setEditCommentId(null)
            setReplies(prev =>
                prev.map(reply =>
                    reply._id === commentId ? response.data.data.comment : reply
                )
            );
            toast.success(response.data.message)
        }catch(error){
            console.log(error)
        }finally{
            setLaodingChange(false)
        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();

        const diffInSeconds = Math.floor((now - date) / 1000);

        const minutes = Math.floor(diffInSeconds / 60);
        const hours = Math.floor(diffInSeconds / 3600);
        const days = Math.floor(diffInSeconds / 86400);
        const weeks = Math.floor(diffInSeconds / 604800);
        const months = Math.floor(diffInSeconds / 2592000);
        const years = Math.floor(diffInSeconds / 31536000);

        if (diffInSeconds < 60) {
            return "Just now";
        } else if (minutes < 60) {
            return `${minutes}m`;
        } else if (hours < 24) {
            return `${hours}h`;
        } else if (days < 7) {
            return `${days}d`;
        } else if (weeks < 4) {
            return `${weeks}w`;
        } else if (months < 12) {
            return `${months}mo`;
        } else {
            return `${years}y`;
        }
    }








    return (
        <>
            <div key={comment._id} className='py-2 comment' >
                
                                <div className='flex gap-3 '>
                                    <img src={comment.commentCreator.photo} alt="" className='w-10 h-10 rounded-full' />
                                    <div className='px-3 py-2 w-full'>

                                        <div className="flex gap-3">

                                            <div className='px-3 rounded-lg  py-2 bg-gray-200 shadow  min-w-28.5 max-w-fit'>
                                                <h3 className='text-sm font-bold'>{comment.commentCreator.name}</h3>
                                                {editCommentId === comment._id ? <>
                                                    <div className='flex items-center gap-2'>
                                                        <Input className='border-2 border-gray-300 rounded-xl' type="text" value={newContent} onChange={(e)=>setNewContent(e.target.value)} />
                                                        <Button isLoading={laodingChange} onClick={()=>handleEditComment(postId,comment._id)} className='bg-blue-600 text-white font-bold'>save</Button>
                                                        <Button onClick={()=>handleCancelEditing()} >cancel</Button>
                                                    </div>
                                                
                                                    </>   
                                                : 
                                                    <div>
                                                        { comment.content && <p className='text-sm text-gray-700' >{comment.content}</p>}
                                                        { comment.image && <img src={comment.image} alt='commentPhoto' className='w-full h-50 object-cover rounded-xl' />}
                                                
                                                    </div>   
                                                }
                                            </div>
                                            {(comment.commentCreator._id === profileData.id || userId === profileData.id) && 
                                                <>
                                                    <div>
                                                        <EditOrDeleteCommentBTn comment={comment} postId={postId} changeInput={changeInput} handleDeleteComment={handleDeleteComment}/>
                                                    </div>
                                                </>
                                            }

                                        </div>
                                        
                                        <div className='flex justify-between items-center w-full'>
                                            <div className="flex items-center gap-3 my-3">
                                                <p className='text-gray-400 text-sm '> {formatDate(comment.createdAt)} </p>
                                                <button 
                                                    onClick={()=>handleLikeComment(postId, comment._id)} 
                                                    className={`transition-all duration-200 cursor-pointer hover:underline flex items-center gap-1 ${
                                                        comment.likes.includes(profileData._id)
                                                        ? 'text-blue-500 font-semibold'
                                                        : 'text-gray-500 hover:text-blue-400'
                                                        }`}
                                                >
                                                    {isLoadingLiking === comment._id  ?
                                                        "...Liking"
                                                    :
                                                        comment.likes.includes(profileData._id) 
                                                        ? 'Liked' : 'Like' 
                                                    }
                                                    ({comment.likes.length})
                                                </button>
                                                {replayStatement === comment._id ?
                                                    <button onClick={()=>setreplayStatement(null)} className='hover:underline cursor-pointer text-blue-600'>hide Replies</button>
                                                :
                                                    <button onClick={() => {
                                                        setreplayStatement(comment._id);
                                                        fetchAllReplies(postId, comment._id);
                                                    }} className='hover:underline cursor-pointer '>
                                                        reply ({comment.repliesCount ? comment.repliesCount : 0})
                                                        </button>
                                                }
                                            </div>
                                            

                                        </div>
                                        {replayStatement === comment._id && <>

                                            {replyloading ? 

                                                <div className="flex gap-2 text-gray-500 my-2">
                                                    <Spinner color='text-gray-500' size='sm'/>
                                                    please wait for replies
                                                </div>
                                            
                                                :
                                                replies.length===0 ? <p className='text-xs text-slate-500 my-2'> No Replies Yet For This Comment</p> :
                                                <>
                                                    {replies.map((reply)=>(
                                                        <div key={reply._id} className='py-2 comment' >
                                                            <div className='flex gap-3 '>
                                                                <img src={reply.commentCreator.photo} alt="" className='w-7 h-7 rounded-full' />
                                                                <div className='px-3 py-2 w-full'>

                                                                    <div className="flex gap-3">

                                                                        <div className='px-3 rounded-lg  py-2 bg-gray-200 shadow  min-w-28.5 max-w-fit'>
                                                                            <h3 className='text-sm font-bold'>{reply.commentCreator.name}</h3>
                                                                            {editCommentId === reply._id ? <>
                                                                                <div className='flex items-center gap-2'>
                                                                                    <Input className='border-2 border-gray-300 rounded-xl' type="text" value={newContent} onChange={(e)=>setNewContent(e.target.value)} />
                                                                                    <Button isLoading={laodingChange} onClick={()=>handleEditComment(postId,reply._id)} className='bg-blue-600 text-white font-bold'>save</Button>
                                                                                    <Button onClick={()=>handleCancelEditing()} >cancel</Button>
                                                                                </div>
                                                                            
                                                                                </>   
                                                                            : 
                                                                                <div>
                                                                                    { reply.content && <p className='text-sm text-gray-700' >{reply.content}</p>}
                                                                                    { reply.image && <img src={reply.image} alt='commentPhoto' className='w-full h-50 object-cover rounded-xl' />}
                                                                            
                                                                                </div>   
                                                                            }
                                                                        </div>
                                                                        {(reply.commentCreator._id === profileData.id || userId === profileData.id) && 
                                                                            <>
                                                                                <div>
                                                                                    <EditOrDeleteCommentBTn comment={reply} postId={postId} changeInput={changeInput} handleDeleteComment={handleDeleteComment}/>
                                                                                </div>
                                                                            </>
                                                                        }

                                                                    </div>
                                                                    <div className='flex justify-between items-center w-full'>
                                                                        <div className="flex items-center gap-3 my-3">
                                                                            <p className='text-gray-400 text-sm '> {formatDate(reply.createdAt)} </p>
                                                                            <button
                                                                                onClick={() => handleLikeReply(postId, reply._id)}
                                                                                className={`transition-all duration-200 cursor-pointer hover:underline flex items-center gap-1 ${
                                                                                    reply.likes.includes(profileData._id)
                                                                                        ? 'text-blue-500 font-semibold'
                                                                                        : 'text-gray-500 hover:text-blue-400'
                                                                                }`}
                                                                            >
                                                                                {isLoadingLiking === reply._id  ?
                                                                                    "...Liking"
                                                                                    :
                                                                                    reply.likes.includes(profileData._id) 
                                                                                    ? 'Liked' : 'Like' 
                                                                                }
                                                                                ({reply.likesCount})
                                                                                
                                                                            </button>                                                                   
                                                                        </div>
                                                                    </div>                                                     
                                                                </div>
                                                            </div>                                                        
                                                        </div>
                                                ))}
                                                </>
                                                
                                            }
                                            <div>
                                                <div className='flex  gap-2'>
                                                    <img src={profileData.photo} alt="" className='w-10 h-10 rounded-full' />
                                                    <CreateComment
                                                        value={replyBody}
                                                        setValue={setReplyBody}
                                                        placeholder="Write a Reply"
                                                        loading={replyloading}
                                                        wrapperClass="bg-gray-300"
                                                        onSubmit={(data) =>
                                                            handleSubmitReply(postId, comment._id, data)
                                                        }
                                                    />

                                                </div>
                                            </div>                            
                                        </>}                               
                                    </div>
                                </div>                        
                            </div>
        </>
    )
}
