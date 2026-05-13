import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'

import { getAllPosts, getHomeFeedPosts, getMyPosts } from '../../services/PostServicies';
import PostSkeleton from '../../Component/Skeletons/PostSkeleton';
import Post from '../../Component/Post/Post';
import CreatePost from '../../Component/CreatePost/CreatePost';
import { getFollowSuggestions } from '../../services/Suggestions';
import SideTaps from '../../Component/SideTaps/SideTaps';
import SuggestedFriends from '../../Component/SuggestedFriends/SuggestedFriends';

export default function NewsFeed() {

  const {profileData} = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [suggestions, setsuggestions] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [callbackFunction, setCallbackFunction] = useState(fetchAllPosts);
  const [allPostLoading, setAllPostLoading] = useState(false)



  const [activeTab, setActiveTab] = useState("feed");
  async function fetchAllPosts(){
    try {
      setAllPostLoading(true);
      let response = await getAllPosts();
      setPosts(response.data.data.posts);
    } catch (error) {
      console.log(error)
    }finally{
      setAllPostLoading(false);
    }
  }
  async function fetchHomePosts(){
    try {
      setAllPostLoading(true);
      let response = await getHomeFeedPosts();
      setPosts(response.data.data.posts);
    } catch (error) {
      console.log(error)
    }finally{
      setAllPostLoading(false);
    }
  }
  async function fetchUserPosts(userId){
    try {
      setAllPostLoading(true);
      let response = await getMyPosts(userId);
      setPosts(response.data.data.posts);
      console.log(response.data.data.posts,"11111111111111111111111111111111111111111111")
    } catch (error) {
      console.log(error)
    }finally{
      setAllPostLoading(false);
    }
  }
  async function fetchSavePosts(){
    try {
      setAllPostLoading(true);
      const response = await getAllPosts();
      const savePosts = response.data.data.posts.filter(post => post.bookmarked === true);
      setPosts(savePosts);    
    } catch (error) {
      console.log(error)
    }finally{
      setAllPostLoading(false);
    }
  }


  
  async function handleFollowSuggestion(){
      const response = await getFollowSuggestions();
      const allSuggestions = response.data.data.suggestions;
      const following = profileData?.following || [];
      const suggestionsList = [
        ...allSuggestions.filter(
          (suggestion) => !following.includes(suggestion._id)
        ),
        ...allSuggestions.filter(
          (suggestion) => following.includes(suggestion._id)
        ),
      ];
      setsuggestions(suggestionsList);
  }

  async function loadPage(){
      try{
        setPageLoading(true)
        await fetchAllPosts();
        await handleFollowSuggestion();
      }catch(error){
        console.log(error)
      }finally{
        setPageLoading(false)
      }
    }
  useEffect(()=>{
    
    loadPage();
  },[]);



  let {token}=useContext(AuthContext);
  console.log(token,"userFedd")
  return (
    <>
      
      <div className='relative min-h-screen bg-[#f0f2f5]'>
        {pageLoading && <>
          <div className='fixed inset-0 z-40 flex items-center justify-center bg-slate-900/20 backdrop-blur-[2px]'>
          <div className='flex items-center gap-2 rounded-xl p-3 bg-white' >
            <svg aria-hidden="true" class="w-8 h-8 text-neutral-tertiary animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            
            <p className=' text-gray-800'>Refresh your timeline...</p>
          </div>
        </div>
          
        </>}
        
        <div className="container mx-auto">
          <div className='grid grid-cols-4 gap-8 relative '>

            <div className='left-side col-span-4 order-1 lg:order-1 lg:col-span-1 lg:sticky lg:top-17.5 self-start  '>
              <div className='p-2 border-2 border-gray-200 shadow-md rounded-xl flex-col gap-2'>
                
                <SideTaps activeTab={activeTab} setActiveTab={setActiveTab} fetchAllPosts={fetchAllPosts} fetchHomePosts={fetchHomePosts} fetchUserPosts={fetchUserPosts} fetchSavePosts={fetchSavePosts} setPosts={setPosts} setCallbackFunction={setCallbackFunction} />
              
              </div>
            </div>

              <div className='col-span-4 order-3 lg:order-2 lg:col-span-2 space-y-4'>
                <CreatePost fetchAllPosts={fetchAllPosts} setPosts={setPosts} />
                {allPostLoading ?  <PostSkeleton/> : posts.length===0 ? <p className='text-center text-gray-500 py-10'>No posts yet. Be the first one to publish.</p>  : posts.map((post)=> <Post callBack={callbackFunction} key={post._id} post={post} setPosts={setPosts} activeTab={activeTab} />)  }
            </div>
            
            <div className='right-side col-span-4 order-2 lg:order-3 lg:col-span-1 lg:sticky lg:top-17.5 self-start'>
              
                <SuggestedFriends suggestions={suggestions} handleFollowSuggestion={handleFollowSuggestion} />

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
