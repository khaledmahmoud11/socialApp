import React, { useContext, useState } from 'react'
import { Button, Spinner } from '@heroui/react';
import { FaCheck } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { markNotificationAsRead } from '../../services/Notifications';
import { Link } from 'react-router';
import { NotificationContext } from '../../Context/Notifications';

export default function Notification({notification,setNotifications}) {
    const {setCount,count} = useContext(NotificationContext)
    const [isLaoding, setIsLaoding] = useState(false)
    async function fetchNotificationMark(notificationId){
        try {
            setIsLaoding(true);
            const response = await markNotificationAsRead(notificationId);
            setNotifications((prev) =>
                prev.map((notification) =>
                    notification._id === response.data.data.notification._id
                    ? response.data.data.notification
                    : notification
                )
            );
            setCount(count-1);
        } catch (error) {
            console.log(error)
        }finally{
            setIsLaoding(false);
        }
    }
    
    function formatTimeAgo(dateString) {
        const now = new Date();
        const date = new Date(dateString);
        const diffInSeconds = Math.floor((now - date) / 1000);

        const minutes = Math.floor(diffInSeconds / 60);
        const hours = Math.floor(diffInSeconds / 3600);
        const days = Math.floor(diffInSeconds / 86400);

        if (diffInSeconds < 60) {
            return "just now";
        }

        if (minutes < 60) {
            return `${minutes} min ago`;
        }

        if (hours < 24) {
            return `${hours} h ago`;
        }

        return `${days}d ago`;
        }
    return (
        <>  
            <Link to={`/postDetails/${notification.entity._id}`}>
                <div className="notification space-y-4 my-3">
                    <div className={`rounded-xl p-3 ${notification.isRead ? "bg-white"  : "bg-blue-50"} border border-blue-100`}>
                        <div className="flex items-center gap-3">
                            <div className='relative w-12 h-12 rounded-full'>
                                <div className='absolute -bottom-2 -right-2 bg-white w-6 h-6 rounded-full z-10 flex items-center justify-center'>
                                    {notification.type === "comment_post"?
                                            <span> <FaRegComment className='text-blue-500' /> </span>
                                        : notification.type === "like_post"?
                                            <span><FaRegHeart className='text-red-500' /></span>
                                        :
                                            <span> <FaShare /> </span>
                                    }
                                </div>
                                <img src={notification.actor.photo} alt="" className='w-12 h-12 rounded-full' />
                            </div>
                            <div className='w-full'>
                                <div className="flex  items-center justify-between">
                                    <p className='text-sm leading-6 text-slate-800 flex flex-col sm:flex-row sm:items-center gap-1'>
                                        
                                        <span className='font-extrabold'>
                                        {notification.actor.name}</span> {notification.type === "comment_post"?
                                            <span>comment on your post</span>
                                        : notification.type === "like_post"?
                                            <span>like  your post</span>
                                        :
                                            <span>share your post</span>
                                        }
                                        
                                    </p>
                                    <div className='flex items-center gap-1'>
                                        <p className='text-xs font-semibold text-slate-500'>{formatTimeAgo(notification.createdAt)}</p>
                                        {!notification.isRead && <div className='w-1 h-1 rounded-full bg-blue-500'></div> }
                                    </div>
                                </div>
                                
                                {notification.isRead ?
                                    <>
                                        <div className='flex items-center gap-1 text-sm text-green-700'>
                                            <FaCheck /> Read
                                        </div>
                                    </>
                                :
                                    <>
                                        <button 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                fetchNotificationMark(notification._id);
                                            }}
                                            className='mt-2 flex items-center gap-2 font-semibold text-xs text-blue-500 bg-white px-2 py-1 rounded-lg cursor-pointer hover:bg-blue-100 border border-transparent hover:border-blue-200 transition-all duration-200 '
                                        >
                                            {isLaoding ? <Spinner size="sm" className="scale-75 text-" /> : <FaCheck /> } Mark As Read
                                        </button>
                                    </>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}
