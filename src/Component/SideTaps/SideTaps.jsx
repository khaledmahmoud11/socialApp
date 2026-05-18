import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import { LuNewspaper } from "react-icons/lu";
import { LuSparkles } from "react-icons/lu";
import { LuEarth } from "react-icons/lu";
import { CiBookmark } from "react-icons/ci";
export default function SideTaps({activeTab, setActiveTab ,fetchAllPosts,fetchHomePosts,fetchUserPosts,fetchSavePosts,setCallbackFunction}) {

    let {profileData}=useContext(AuthContext)

    
    


    const tabs = [
        {
            key: "community",
            label: "Community",
            icon: <LuEarth />,
            onClick: () => {
                setCallbackFunction(() => fetchAllPosts);
                fetchAllPosts();
            },
        },
        {
            key: "feed",
            label: "Feed",
            icon: <LuNewspaper />,
            onClick: () => {
                setCallbackFunction(() => fetchHomePosts);
                fetchHomePosts();
            },
        },
        {
            key: "myPosts",
            label: "My Posts",
            icon: <LuSparkles />,
            onClick: () => {
                const fn = () => fetchUserPosts(profileData.id);

                setCallbackFunction(() => fn);
                fn();
            },
        },
        {
            key: "saved",
            label: "Saved",
            icon: <CiBookmark />,
            onClick: () => {
                setCallbackFunction(() => fetchSavePosts);
                fetchSavePosts();
            },
        },
        ];
    return (
        <>
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => {
                    setActiveTab(tab.key);
                        tab.onClick();
                    }}
                    className={`flex mb-1 gap-2 items-center font-bold p-3 rounded-xl w-full cursor-pointer
                        ${
                            activeTab === tab.key
                            ? "bg-blue-100 text-blue-500"
                            : "text-gray-700"
                        }
                        hover:bg-gray-200
                    `}
                >
                {tab.icon}
                {tab.label}
                </button>
            ))}
        </>
    )
}
