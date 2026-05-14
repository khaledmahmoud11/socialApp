import React, { useState } from 'react'
import { Tabs, Tab } from "@heroui/react";
import { FaCheckDouble } from "react-icons/fa6";
import Notification from '../../Component/Notification/Notification';

export default function Notifications() {
    const [selected, setSelected] = useState("all");
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
                <Notification/>
            </div>
        </>
    )
}
