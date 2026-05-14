import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getPostDetails } from '../../services/PostServicies';
import PostHeader from '../../Component/PostCard/PostHeader';
import PostBody from '../../Component/PostCard/PostBody';
import PostFooter from '../../Component/PostCard/PostFooter';
import PostSkeleton from '../../Component/Skeletons/PostSkeleton';
import Post from '../../Component/Post/Post';

export default function PostDetails() {

  const {id} = useParams();
  const [post, setPost] = useState("")

  console.log(id)
  useEffect(() => {
    async function fetchPostDetails(postId){
      let response = await getPostDetails(postId);
      setPost(response.data.data.post)
    }
    fetchPostDetails(id);
  }, [id])
  return (
    <>
      {post?    
        <>
          <div className='max-w-175 mx-auto'>
            
              <Post key={post._id} post={post} />
          </div>
        </>  
      : 
        <PostSkeleton />
      }
    </>
  )
}
