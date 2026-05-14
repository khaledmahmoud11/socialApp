import React, { useContext, useRef, useState } from 'react'
import coverPhoto from "../../assets/app_photos/pexels-pixabay-207130.jpg"
import { MdAlternateEmail } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa6";
import { AuthContext } from '../../Context/AuthContext';
import { getMyPosts } from '../../services/PostServicies';
import Post from '../../Component/Post/Post';
import PostSkeleton from '../../Component/Skeletons/PostSkeleton';
import { Button, Input } from '@heroui/react';
import { FaCamera } from "react-icons/fa";
import { changeProfileImage, userProfile } from '../../services/Profile';
import { useParams } from 'react-router';
import { IoMdFemale } from "react-icons/io";
import { IoMdMale } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { MdOutlineDateRange } from "react-icons/md";
import CreatePost from '../../Component/CreatePost/CreatePost';

export default function Profile() {


    const {id} = useParams();
    const {profileData}=useContext(AuthContext)
    const changePhoto = useRef();
    const [isChanging, setIsChanging] = useState(false)
    const [loading, setLoading] = useState(false)
    const [sendingProfileImage, setSendingProfileImage] = useState("")
    const [displayProfileImage, setDisplayProfileImage] = useState("")
    
    
    const queryClient = useQueryClient();
    function handlDeleteProfilePost(){
        queryClient.invalidateQueries({
            queryKey: ["myPosts", userId],
        });
    }
    function handleChangeProfilePhoto(){
        changePhoto.current.click();
    }

    function handleUploadImage(){
        setSendingProfileImage(changePhoto.current.files[0])
        setDisplayProfileImage(URL.createObjectURL(changePhoto.current.files[0]))
        setIsChanging(true)
    }
    async function fetchChange(){
        
        try {
            setLoading(true)
        const formData = new FormData();
        if (sendingProfileImage) {
            formData.append("photo", sendingProfileImage);
        }
        const response = await changeProfileImage(formData);
        console.log(response,"response for changeing photo ");
        setDisplayProfileImage("");
        setDisplayProfileImage("");
        } catch (error) {
        console.log(error)
        }finally{
            setIsChanging(false)
            setLoading(false)
        }

    }
    function formatDate(dateString) {
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    const userId = id ?? profileData?.id;
    const { data: userResponse, isLoading: userLoading } = useQuery({
        queryKey: ["userProfile", userId],
        enabled: !!userId,
        queryFn: () => userProfile(userId),
    });

    const { data: postsResponse, isLoading: postsLoading } = useQuery({
        queryKey: ["myPosts", userId],
        enabled: !!userId,
        queryFn: () => getMyPosts(userId),
    });
    const user = userResponse?.data?.data?.user;
    const myPosts = postsResponse?.data?.data?.posts || [];
    const isLoading = userLoading || postsLoading;
    return (
    <>
        <div className='container mx-auto'>
            <div className="profileInfo rounded-xl my-4" >
                <div className='w-full h-50 rounded-xl ' >
                    {user?.cover ?
                        <img src={user?.cover || coverPhoto} className=' rounded-xl w-full h-full object-cover' alt="cover_Photo" />
                        : 
                            <div className='rounded-t-xl group/cover relative h-44 sm:h-52 lg:h-60 overflow-hidden bg-[linear-gradient(112deg,#0f172a_0%,#1e3a5f_36%,#2b5178_72%,#5f8fb8_100%)]'>
                            </div>
                    }
                    <div className='flex items-center gap-2 '>
                        <span></span>
                    </div>
                </div>
                <div className='p-4 rounded-xl shadow-md -translate-y-10 space-y-3 '>
                    <div className='p-5 w-full bg-white  rounded-2xl container mx-auto'>
                        <div className='flex flex-col lg:items-center lg:flex-row lg:justify-between w-full  space-y-3'>
                            <div className='flex items-center gap-3'>
                                <div className='relative'>
                                    <img src={displayProfileImage || user?.photo} className="rounded-full w-25 h-25 " alt="" />
                                    {user?.id===profileData.id && <>
                                        <div className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer">
                                            <span onClick={()=>handleChangeProfilePhoto()} > <FaCamera className='text-white' /> </span>
                                            <Input onInput={()=>handleUploadImage()} className='hidden' ref={changePhoto} type='file' />
                                        </div>
                                    </>}

                                </div>
                                <div className='space-y-2'>
                                    <h1 className='text-4xl font-bold'>{user?.name}</h1>
                                    <p className='text-xl text-gray-700 flex items-center gap-2'><MdAlternateEmail /> {user?.username} </p>
                                </div>
                            </div>
                            <div className='flex items-center justify-between lg:justify-start  gap-2  '>
                                <div className='flex flex-col rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4'>
                                    <h3 className='text-[8px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs'>Follower</h3>
                                    <p className='mt-1 text-xl font-black text-slate-900 sm:text-3xl'>{user?.followersCount}</p>
                                </div>
                                <div className='flex flex-col rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4'>
                                    <h3 className='text-[8px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs'>Following</h3>
                                    <p className='mt-1 text-xl font-black text-slate-900 sm:text-3xl'>{user?.followingCount}</p>
                                </div>
                                <div className='flex flex-col rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4'>
                                    <h3 className='text-[8px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs'>Bookmarks</h3>
                                    <p className='mt-1 text-xl font-black text-slate-900 sm:text-3xl'>{user?.bookmarksCount}</p>
                                </div>
                            </div>

                        </div>
                        <Button isLoading={loading} onClick={()=>fetchChange()} className={`bg-blue-600 text-white ${!isChanging ? "hidden" : ""} my-1`}> save change</Button>
                        <Button onClick={()=>{ setSendingProfileImage(""),setDisplayProfileImage(""),setIsChanging(false)}} className={`bg-blue-600 text-white ${!isChanging ? "hidden" : ""} my-1`}> cancel change</Button>

                    </div>
                    <hr className='text-gray-300 my-3' />
                    <div className=' bg-white  items-stretch justify-between'>
                        <div className='py-2 px-4 border-1 border-gray-300 rounded-xl bg-gray-100 '>
                            <h3 className='font-bold text-xl mb-3'>About</h3>
                            <div className="space-y-2">
                                {user?.id===profileData.id && <>
                                    <p className='flex items-center gap-2 text-gray-700' > <CiMail /> {user?.email}</p>
                                </>}
                                <p className='flex items-center gap-2 text-gray-700' > {user?.gender === "male" ? <IoMdMale />: <IoMdFemale />} {user?.gender}</p>
                                <p className='flex items-center gap-2 text-gray-700' > <MdOutlineDateRange />{formatDate(user?.dateOfBirth)}</p>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            {/* <CreatePost fetchAllPosts={getMyPosts(userId)}/> */}
            <div className='my posts space-y-8 my-5'>
                {isLoading ? <PostSkeleton />  :  <> {myPosts?.map((post)=> <Post callBack={handlDeleteProfilePost} key={post._id} post={post} />)} </>}
                                                        
            </div>
        </div>
    </>
    )
}
