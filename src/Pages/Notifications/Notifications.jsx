import React, { useEffect, useState } from 'react'
import { Tabs, Tab, Spinner } from "@heroui/react";
import { FaCheckDouble } from "react-icons/fa6";
import Notification from '../../Component/Notification/Notification';
import { getAllNotifications } from '../../services/Notifications';

export default function Notifications() {
    const [selected, setSelected] = useState("all");
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    async function fetchAllNotification(){
        try {
            const response = await getAllNotifications();
            console.log(response,"for all notification")
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchAllNotification();
    })
    return (
        <>
            <div className="container mx-auto my-10 p-5  border border-gray-300 rounded-xl h-120">
                <div className="header">
                    <div className="flex flex-col gap-2 md:flex-row items-center justify-between ">
                        <div className='text-center md:text-start'>
                            <h2 className='text-xl font-black text-slate-900 sm:text-2xl'>Notifications</h2>
                            <p className='mt-1 text-sm text-slate-500'>Realtime updates for likes, comments, shares, and follows.</p>
                        </div>
                        <button 
                            className='flex items-center gap-2 w-full justify-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto cursor-pointer'
                        >
                            <FaCheckDouble /> Mark all as read
                        </button>
                    </div>
                </div>
                <div className="readTogle">
                    <Tabs
                        selectedKey={selected}
                        onSelectionChange={setSelected}
                        aria-label="Options"
                        variant="light"
                        classNames={{
                            tabList:
                            "flex gap-2 p-1 rounded-full overflow-x-auto scrollbar-hide",
                            tab: "px-3 py-1 rounded-full",
                            cursor: "bg-blue-500 rounded-full",
                            tabContent: "text-sm group-data-[selected=true]:text-white"
                        }}
                        >
                        <Tab key="all" title="All" />
                        <Tab key="unread" title="Unread" />
                        </Tabs>
                </div>
                {/* {isLoading ? 
                    <>
                        <div className="flex items-center gap-2 text-gray-500">
                            <Spinner color='text-gray-500' size='sm'/> Loading Your Notification ...
                        </div>
                    </>
                : notifications.length===0 ?
                    <>
                        <p>no notification for you </p>
                    </>
                :
                    <Notification/> 
                } */}
                
            </div>
        </>
    )
}
