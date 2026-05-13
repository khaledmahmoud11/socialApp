import React from 'react'
import Photo from "../../assets/auth_photos/pexels-fotios-photos-1092644.jpg"
import userAvatar from "../../assets/auth_photos/alex-avatar-BLDJqiDr.png"
import { NavLink, Outlet } from 'react-router'
import AuthImg from "../../assets/auth_photos/signup-bg-DGRfriy9.png" 
import { FaMessage } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

export default function AuthLayout() {
  return (
    <>
    <div>
      <div className='grid grid-cols-1 lg:grid-cols-2 container mx-auto gap-5'>
        <div className='flex flex-col  justify-center h-full container mx-auto  order-2 lg:order-1'>
          <h1 className='text-6xl mb-5 text-blue-900 font-extrabold'>Route Posts</h1>
          <p className='text-2xl mb-5'>Connect with friends and the world around you on Route Posts.</p>
          <div className='border-1 border-gray-400 shadow-md rounded-xl p-4'>
              
              <p className='text-sm text-blue-900 font-extrabold'>About Route Academy</p>
              <h2 className='text-md font-bold mb-4'>Egypt's Leading IT Training Center Since 2012</h2>
              <p className='text-gray-600 mb-4'>Route Academy is the premier IT training center in Egypt, established in 2012. We specialize in delivering high-quality training courses in programming, web development, and application development. We've identified the unique challenges people may face when learning new technology and made efforts to provide strategies to overcome them.</p>
              
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                <div className=' rounded-xl p-3 border-1 border-gray-500'>
                  <p className='text-md text-blue-900 font-extrabold'>2012</p>
                  <p className='text-sm font-bold'>Founded</p>
                </div>  
                <div className=' rounded-xl p-3 border-1 border-gray-500'>
                  <p className='text-md text-blue-900 font-extrabold'>40K+</p>
                  <p className='text-sm font-bold'>Graduates</p>
                </div>  
                <div className=' rounded-xl p-3 border-1 border-gray-500'>
                  <p className='text-md text-blue-900 font-extrabold'>50+</p>
                  <p className='text-sm font-bold'>Partner Companies</p>
                </div>  
                <div className=' rounded-xl p-3 border-1 border-gray-500'>
                  <p className='text-md text-blue-900 font-extrabold'>5</p>
                  <p className='text-sm font-bold'>Branches</p>
                </div>  
                <div className=' rounded-xl p-3 border-1 border-gray-500'>
                  <p className='text-md text-blue-900 font-extrabold'>20</p>
                  <p className='text-sm font-bold'>Diplomas Available</p>
                </div>

              </div>
          
          </div>

        </div>
        <div className='w-full min-h-screen flex flex-col  justify-center order-1 lg:order-2'>
          <div className='flex mb-4 justify-center '>
            <NavLink to="/login" className="font-bold w-full text-center">Login</NavLink>
            <NavLink to="/register" className="font-bold w-full text-center">Register</NavLink>
          </div>
          <div>
            <Outlet />
          </div>
          
        </div>
      </div>
    </div>

    </>
  )
}
