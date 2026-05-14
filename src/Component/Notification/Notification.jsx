import React from 'react'
import testPhoto from "../../assets/app_photos/pexels-jeffreyreed-769772.jpg"
import { Button } from '@heroui/react';
import { FaCheck } from "react-icons/fa6";
export default function Notification() {
    return (
        <>
                <div className="notification space-y-4 my-3">
                    <div className="rounded-xl p-3 bg-blue-200 border border-blue-500">
                        <div className="flex items-center gap-3">
                            <div className='relative w-12 h-12 rounded-full'>
                                <div className='absolute -bottom-2 -right-2 bg-green-400 w-6 h-6 rounded-full z-10'></div>
                                <img src={testPhoto} alt="" className='w-12 h-12 rounded-full' />
                            </div>
                            <div className='w-full'>
                                <div className="flex items-center justify-between">
                                    <p className='text-sm leading-6 text-slate-800'>
                                        <span className='font-extrabold'>khaled</span> <span>comment on your post</span>
                                    </p>
                                    <div className='flex items-center gap-3'>
                                        <p className='text-xs font-semibold text-slate-500'>17h</p>
                                        <div className='w-1 h-1 rounded-full bg-blue-500'></div>

                                    </div>
                                </div>
                                
                                <p className=' font-semibold text-xs '>test</p>
                                <button className='mt-2 flex items-center gap-2 font-semibold text-xs text-blue-500 bg-white px-2 py-1 rounded-lg '>
                                    <FaCheck /> Mark As Read
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}
