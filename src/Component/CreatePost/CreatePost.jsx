import React, { useContext, useRef } from 'react'
import { Button, Input, Select, SelectItem } from '@heroui/react'
import { useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { createPost } from '../../services/PostServicies';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';

export default function CreatePost({setPosts}) {
  let {profileData}=useContext(AuthContext)
  const inputPhoto = useRef();
  const inputbody = useRef();
  const [privacy, setPrivacy] = useState("Public");
  const [sendingImage, setSendingImage] = useState("")
  const [displayImage, setDisplayImage] = useState("")
  const [postContent, setPostContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  function handleSelectImage(){
    inputPhoto.current.click();
  }
  function handleUploadImage(){
    setSendingImage(inputPhoto.current.files[0])
    setDisplayImage(URL.createObjectURL(inputPhoto.current.files[0]))
  }
  async function fetchCreatePost(){
    try {
      setIsLoading(true)
      const formData = new FormData();
      if(postContent){
        formData.append("body",postContent);
      }
      if (sendingImage) {
          formData.append("image", sendingImage);
      }
      const response = await createPost(formData);
      let newPost = response.data.data.post;
      newPost = {
      ...newPost,
      user:{
        _id:profileData._id,
        name: profileData.name,
        photo :profileData.photo,
        username :profileData.username

      }
    };
      setDisplayImage("");
      setSendingImage("");
      setPostContent("");
      inputPhoto.current.value = "";
      inputbody.current.value = ""
      toast.success(response.data.message)
      setPosts(prevPosts => [newPost, ...prevPosts]);

    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }

  }
  return (
    <>
      <div className='p-3 shadow-md rounded-xl space-y-3'>
              <div className='flex items-center gap-4'>
        <img src={profileData?.photo} alt="avatar" className='w-12.5 h-12.5 rounded-full ' />
        <div>
          <h3 className='font-bold' >{profileData?.name}</h3>
          <div className='flex items-center gap-2 text-sm'>
            <span className="ml-2">
              {privacy === "Public" && <FaGlobe />}
              {privacy === "Followers" && <FaUserFriends />}
              {privacy === "Only Me" && <FaLock />}
            </span>

            <select onChange={(e) => setPrivacy(e.target.value)} value={privacy}>
              <option value="Public">Public</option>
              <option value="Followers">Followers</option>
              <option value="Only Me">Only Me</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <textarea ref={inputbody} onChange={(e)=>setPostContent(e.target.value)} name="" id="" placeholder={`what's on your mind , ${profileData?.name}`} className='w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white'></textarea>
      </div>
      <div className='relative'>
        {displayImage && <>
          <img src={displayImage} className='w-full h-75 ' alt="" />
          <span onClick={()=>{
            setDisplayImage("") 
            setSendingImage("")
          }} className='absolute bg-black text-white top-0 right-0 rounded-full p-2 cursor-pointer '> <IoMdClose /> </span>
        </>}
      </div>
      <hr  />
      <div className='flex justify-between'>
        <div className='flex gap-3 items-center '>
          <p onClick={()=>handleSelectImage()} className='flex gap-2 items-center cursor-pointer '> <FaImage className='text-green-600' />photo/videos</p>
          <Input onInput={()=>handleUploadImage()} ref={inputPhoto} type='file' className='hidden' />
          <p className='flex gap-2 items-center '> <MdOutlineEmojiEmotions className='text-yellow-700'  />feelings/activities</p>
        </div>
        <div>
          <Button isDisabled={!postContent && !sendingImage} isLoading={isLoading} onClick={()=>fetchCreatePost()} className='p-3 rounded-2xl bg-blue-600 cursor text-white'>Upload</Button>
        </div>
      </div>

      </div>
    </>
  )
}
