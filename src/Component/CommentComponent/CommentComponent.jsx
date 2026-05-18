import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import { createReply, DeleteComment, editComment, getAllReplies, likeComment } from '../../services/CommentServices';
import { toast } from 'react-toastify';
import { FaImage } from "react-icons/fa6";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { FaHourglassEnd } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { Button, Input, Spinner } from '@heroui/react';
import CreateComment from './CreateComment/CreateComment';
import EditOrDeleteCommentBTn from './EditOrDeleteCommentBTn/EditOrDeleteCommentBTn';
import { IoIosSend } from 'react-icons/io';
import CommentCard from './ComponentCard/ComponentCard';

export default function CommentComponent({comment,postId,userId,setComments,setNumOfComments}) {
    console.log(comment,"response of comemnt")
    let {profileData}=useContext(AuthContext)
    const [replayStatement, setreplayStatement] = useState(null);
    const [replyBody, setReplyBody] = useState("")
    const [editCommentId, setEditCommentId] = useState(null)
    const [newContent, setNewContent] = useState("")
    const [laodingChange, setLaodingChange] = useState(false)


    const [replyloading, setReplyloading] = useState(false)
    const [submitReplayLoading, setsubmitReplayLoading] = useState(false)

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
            setsubmitReplayLoading(true);
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
            setComments(prevComments => 
                prevComments.map(comment => 
                    comment._id === commentID 
                        ? { ...comment, repliesCount: (comment.repliesCount || 0) + 1 }
                        : comment
                )
            );
            

            reset()

        } catch (error) {
            console.log(error)
        }finally{
            setsubmitReplayLoading(false);
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
    async function handleDeleteComment( postId , commentId ,parentCommentId = null ){
        try {
            const response = await DeleteComment( postId , commentId);
            toast.success(response.data.message);
            if(parentCommentId){
                setComments(prevComments => 
                    prevComments.map(comment => 
                        comment._id === parentCommentId 
                            ? { ...comment, repliesCount: Math.max(0, (comment.repliesCount || 0) - 1) }
                            : comment
                    )
                );
                setReplies(prev => prev.filter(c => c._id !== commentId));
            }else{
                setComments(prev => prev.filter(c => c._id !== commentId));
                setNumOfComments((prevCount) => (prevCount || 0) - 1);
            }
            
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
                
                <CommentCard 
                    item={comment}
                    postId={postId}
                    profileData={profileData}
                    userId={userId}
                    editCommentId={editCommentId}
                    newContent={newContent}
                    setNewContent={setNewContent}
                    laodingChange={laodingChange}
                    isLoadingLiking={isLoadingLiking}
                    handleEditComment={handleEditComment}
                    handleCancelEditing={handleCancelEditing}
                    handleDeleteComment={handleDeleteComment}
                    changeInput={changeInput}
                    formatDate={formatDate}
                    replayStatement={replayStatement}
                    setreplayStatement={setreplayStatement}
                    fetchAllReplies={fetchAllReplies}
                    handleLikeClick={(pid, id, isRep) => isRep ? handleLikeReply(pid, id) : handleLikeComment(pid, id)}
                />

                
                {replayStatement === comment._id && (
                <div className="ms-10 border-l-2 border-gray-100 ps-4"> 
                    {replyloading ? (
                    <div className="flex gap-2 text-gray-500 my-2 text-xs">
                        <Spinner size="sm"/> please wait for replies
                    </div>
                    ) : replies.length === 0 ? (
                    <p className="text-xs text-slate-500 my-2">No Replies Yet For This Comment</p>
                    ) : (
                    <div className="space-y-1">
                        {replies.map((reply) => (
                        <CommentCard 
                            key={reply._id}
                            item={reply}
                            isReply={true}
                            parentCommentId={comment._id}
                            postId={postId}
                            profileData={profileData}
                            userId={userId}
                            editCommentId={editCommentId}
                            newContent={newContent}
                            setNewContent={setNewContent}
                            laodingChange={laodingChange}
                            isLoadingLiking={isLoadingLiking}
                            handleEditComment={handleEditComment}
                            handleCancelEditing={handleCancelEditing}
                            handleDeleteComment={handleDeleteComment}
                            changeInput={changeInput}
                            formatDate={formatDate}
                            handleLikeClick={(pid, id, isRep) => isRep ? handleLikeReply(pid, id) : handleLikeComment(pid, id)}
                        />
                        ))}
                    </div>
                    )}
                    
                    
                    <div className="flex gap-2 mt-3">
                    <img src={profileData.photo} alt="" className="w-8 h-8 rounded-full" />
                    <CreateComment
                        value={replyBody}
                        setValue={setReplyBody}
                        placeholder="Write a Reply..."
                        loading={submitReplayLoading}
                        wrapperClass="bg-gray-100"
                        onSubmit={(data) => handleSubmitReply(postId, comment._id, data)}
                    />
                    </div>
                </div>
                )}
            </div>
        </>
    )
}





