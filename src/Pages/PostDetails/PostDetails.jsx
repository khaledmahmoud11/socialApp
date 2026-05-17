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
  const [isLoading, setIsLoading] = useState(false);
  console.log(id)
  useEffect(() => {
    async function fetchPostDetails(postId){
      try {
        setIsLoading(true);
        let response = await getPostDetails(postId);
        console.log(response,"detailssssssssssssssssssssssssssssssss")
        setPost(response.data.data.post)
      } catch (error) {
        console.log(error)
        console.log(error.response.message)
      }finally{
        setIsLoading(false);
      }
    }
    fetchPostDetails(id);
  }, [id])
  return (
    <>
      {isLoading?
        <PostSkeleton />
      :  post?    
        <>
          <div className='max-w-175 mx-auto py-10'>
            
              <Post key={post._id} post={post} />
          </div>
        </>  
      : 
        <div className="text-center text-gray-500 py-10">
          This post is no longer available. 
        </div>
      }
    </>
  )
}
