import React from 'react'
import Photo from "../../assets/auth_photos/pexels-fotios-photos-1092644.jpg"
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
      <div className="bg-background min-h-screen flex items-center">
        <div className='grid grid-cols-1 lg:grid-cols-2 container mx-auto gap-10 px-4 items-stretch'>
          
          <div className='relative hidden lg:flex flex-col justify-between bg-linear-to-br from-blue-600 to-indigo-900 p-12 text-white rounded-3xl overflow-hidden min-h-150 shadow-xl order-2 lg:order-1 select-none'>
            
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[24px_24px]"></div>
            
            <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-blue-400/20 blur-[80px]"></div>
            <div className="absolute -bottom-20 right-0 h-85 w-85 rounded-full bg-indigo-500/10 blur-[100px]"></div>

            <div className="relative z-10 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 font-black text-lg shadow-lg shadow-blue-950/20">
                S
              </div>
              <span className="text-xl font-black tracking-wider uppercase bg-linear-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Social App
              </span>
            </div>

            <div className="relative z-10 my-auto max-w-md space-y-5">
              <h1 className="text-4xl font-extrabold leading-[1.2] tracking-tight text-white drop-shadow-sm">
                Connect, Share & Discover <br />
                <span className="bg-linear-to-r from-blue-200 to-cyan-300 bg-clip-text text-transparent">
                  With Your Community.
                </span>
              </h1>
              
              <p className="text-base text-blue-100/80 leading-relaxed font-normal">
                A modern social platform built to bring you closer to the people and things you love. Share your thoughts, stay updated, and express yourself in a fast, interactive space.
              </p>

            </div>

            <div className="relative z-10 text-xs font-medium text-blue-200/50 flex items-center gap-3">
              <span>Fast & Secure</span>
              <span className="h-1 w-1 rounded-full bg-blue-200/30"></span>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </div>

          <div className='w-full min-h-screen flex flex-col justify-center order-1 lg:order-2 py-8'>
            <div className='flex mb-8 justify-center border-b border-default-100 pb-2 max-w-sm mx-auto w-full'>
              <NavLink 
                to="/login" 
                className={({ isActive }) => `font-bold w-full text-center pb-2 transition-colors ${isActive ? 'text-primary border-b-2 border-primary' : 'text-default-400'}`}
              >
                Login
              </NavLink>
              <NavLink 
                to="/register" 
                className={({ isActive }) => `font-bold w-full text-center pb-2 transition-colors ${isActive ? 'text-primary border-b-2 border-primary' : 'text-default-400'}`}
              >
                Register
              </NavLink>
            </div>
            
            <div className="max-w-md mx-auto w-full">
              <Outlet />
            </div>
          </div>

        </div>
      </div>
    </>
  )
}