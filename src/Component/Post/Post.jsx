import React from 'react'
import PostHeader from '../PostCard/PostHeader';
import PostBody from '../PostCard/PostBody';
import PostFooter from '../PostCard/PostFooter';
import { useState } from 'react';
// import { getAllPosts } from '../../services/PostServicies';
export default function Post({post ,setPosts,activeTab}) {
        const [comments, setComments] = useState([]);
        const [isEditing, setIsEditing] = useState(false);
        const [loadingComment, setloadingComment] = useState(false);
          const [commentBody, setCommentBody] = useState("")
        



        return (
        <>
                <div className='post  shadow-md rounded-xl '>
                        
                        <PostHeader 
                                activeTab={activeTab} 
                                setPosts={setPosts} 
                                setIsEditing={setIsEditing}  
                                photo={post.user.photo} 
                                id={post.id} 
                                name={post.user.name} 
                                createdAt={post.createdAt} 
                                userId={post?.user._id} 
                                bookmarked={post.bookmarked}   
                        />

                        <PostBody
                                post={post}
                                setPosts={setPosts} 
                                isEditing={isEditing} 
                                setIsEditing={setIsEditing} 
                                comments={comments} 
                                setComments={setComments}
                                loadingComment={loadingComment} 
                                setloadingComment={setloadingComment}
                                commentBody={commentBody}
                                setCommentBody={setCommentBody}  
                        />

                        
                </div>
        </>
                )
}
