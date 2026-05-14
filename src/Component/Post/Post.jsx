import React from 'react'
import PostHeader from '../PostCard/PostHeader';
import PostBody from '../PostCard/PostBody';
import PostFooter from '../PostCard/PostFooter';
import { useState } from 'react';
// import { getAllPosts } from '../../services/PostServicies';
export default function Post({post , callBack ,setPosts,activeTab}) {
        const [comments, setComments] = useState([]);
        const [isEditing, setIsEditing] = useState(false);
        const [loadingComment, setloadingComment] = useState(false);
        console.log(post,"all postsssss")

        return (
        <>
                <div className='post  shadow-md rounded-xl '>
                        
                        <PostHeader activeTab={activeTab} setPosts={setPosts} setIsEditing={setIsEditing} callBack={callBack} photo={post.user.photo} id={post.id} name={post.user.name} username={post.user.username} createdAt={post.createdAt} privacy={post.privacy} userId={post?.user._id} bookmarked={post.bookmarked}   />

                        <PostBody setPosts={setPosts} isShare={post.isShare} sharedPost={post.sharedPost}  isEditing={isEditing} setIsEditing={setIsEditing} commentsCount={post.commentsCount} comments={comments} setComments={setComments} image={post.image} body={post.body} postImage={post} likesCount={post.likesCount} likes={post.likes} sharesCount={post.sharesCount} commentsCount={post.commentsCount} id={post.id} loadingComment={loadingComment} setloadingComment={setloadingComment} name={post.user.name} username={post.user.username} userId={post?.user._id}  />

                        <PostFooter userId={post?.user._id} postId={post.id} comments={comments} setComments={setComments}  topComment={post.topComment} loadingComment={loadingComment} setloadingComment={setloadingComment} />
                </div>
        </>
                )
}
