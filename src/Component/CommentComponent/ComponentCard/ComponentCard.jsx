import React from 'react';
import { IoIosSend } from 'react-icons/io';
import { Spinner } from '@heroui/react'; // أو حسب المكتبة اللي بتستخدمها للـ Spinner
import EditOrDeleteCommentBTn from '../EditOrDeleteCommentBTn/EditOrDeleteCommentBTn';

export default function CommentCard({item, postId,isReply = false,parentCommentId = null,profileData,userId,editCommentId,newContent,setNewContent,laodingChange,isLoadingLiking,handleEditComment,handleCancelEditing,handleDeleteComment,changeInput,handleLikeClick, formatDate,replayStatement,setreplayStatement,fetchAllReplies}) {
    const isEditing = editCommentId === item._id;
    const hasActionPermission = item.commentCreator._id === profileData.id || userId === profileData.id;
    const isLiked = item.likes.includes(profileData._id);

    return (
        <div className={`flex gap-2 ${isReply ? 'py-2 comment' : ''}`}>
        <img 
            src={item.commentCreator.photo} 
            alt={item.commentCreator.name} 
            className={`${isReply ? 'w-7 h-7' : 'w-10 h-10'} rounded-full`} 
        />
        
        <div className="w-full">
            <div className="flex gap-1">
            <div className={`px-3 rounded-lg py-2 shadow min-w-28.5 ${
                isEditing ? 'w-full' : (isReply ? 'bg-gray-200 max-w-fit' : 'max-w-fit')
            }`}>
                <h3 className="text-sm font-bold mb-1">{item.commentCreator.name}</h3>
                
                {isEditing ? (
                    <div className="w-full space-y-2 border border-blue-200 bg-white rounded-xl p-2 mt-1">
                        <textarea 
                        className="w-full resize-none py-1 px-2 text-sm text-gray-700 rounded-lg focus:outline-0" 
                        rows="2"
                        value={newContent} 
                        onChange={(e) => setNewContent(e.target.value)} 
                        />
                        <div className="flex items-center justify-between gap-2">                                    
                        <button 
                            onClick={() => handleCancelEditing()} 
                            className="text-xs text-blue-500 hover:cursor-pointer hover:underline"
                        >
                            cancel
                        </button>
                        <button 
                            disabled={laodingChange}
                            onClick={() => handleEditComment(postId, item._id)} 
                            className={`flex items-center justify-center bg-blue-400 rounded-full h-7 w-7 text-white font-bold cursor-pointer ${laodingChange && "opacity-50"}`}
                        >
                            {laodingChange ? <Spinner size="sm" color="text-white"/> : <IoIosSend />}
                        </button>
                        </div>
                    </div>
                    ) 
                : (
                    <div>
                        {item.content && <p className="text-sm text-gray-700">{item.content}</p>}
                        {item.image && <img src={item.image} alt="commentPhoto" className="w-full h-50 object-cover rounded-xl mt-1" />}
                    </div>
                )}
            </div>

            {hasActionPermission && !isEditing && (
                <div>
                <EditOrDeleteCommentBTn 
                    comment={item} 
                    postId={postId} 
                    parentCommentId={parentCommentId}
                    changeInput={changeInput} 
                    handleDeleteComment={handleDeleteComment}
                />
                </div>
            )}
            </div>

            {!isEditing && (
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-3 my-2 flex-row text-xs text-gray-400 font-semibold">
                <p>{formatDate(item.createdAt)}</p>
                
                <button 
                    onClick={() => handleLikeClick(postId, item._id, isReply)} 
                    className={`transition-all duration-200 cursor-pointer hover:underline flex items-center gap-1 ${
                    isLiked ? 'text-blue-500 font-semibold' : 'hover:text-blue-400'
                    }`}
                >
                    {isLoadingLiking === item._id ? "...Liking" : (isLiked ? 'Liked' : 'Like')}
                    ({isReply ? item.likesCount : item.likes.length})
                </button>

                {!isReply && (
                    replayStatement === item._id ? (
                    <button onClick={() => setreplayStatement(null)} className="hover:underline cursor-pointer text-blue-600">
                        hide Replies
                    </button>
                    ) : (
                    <button 
                        onClick={() => {
                        setreplayStatement(item._id);
                        fetchAllReplies(postId, item._id);
                        }} 
                        className="hover:underline hover:text-blue-400 cursor-pointer"
                    >
                        reply ({item.repliesCount ? item.repliesCount : 0})
                    </button>
                    )
                )}
                </div>                   
            </div>
            )}
        </div>
        </div>
    );
}