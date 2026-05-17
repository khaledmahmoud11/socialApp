import React, { useContext, useState } from 'react'
import { followUser } from '../../services/Suggestions';
import { AuthContext } from '../../Context/AuthContext';
import { Button, Spinner } from '@heroui/react';
import { IoPersonAdd } from "react-icons/io5";
import { FaUserCheck } from "react-icons/fa";
import { Link } from 'react-router';

export default function SuggestionCard({suggestion}) {
    const {profileData,setProfileData} = useContext(AuthContext);
    const [followLoading, setFollowLoading] = useState(null);
    async function handleFollowUser(userID){
        try {
            setFollowLoading(userID);
            const response = await followUser(userID);
            console.log(response,"response after follow");
            setProfileData((prev) => {
                const isFollowing = prev.following.includes(userID);

                return {
                    ...prev,
                    following: isFollowing
                        ? prev.following.filter((id) => id !== userID)
                        : [...prev.following, userID],

                    followingCount: isFollowing
                        ? prev.followingCount - 1
                        : prev.followingCount + 1,
                };
            });
        } catch (error) {
            console.log(error)
        }finally{
            setFollowLoading(null);
        }
                
    }
    return (
        <>
            <div className="suggest" key={suggestion._id}>
                <div className='border border-gray-300 rounded-xl p-3 mb-3'>
                    <div className='flex justify-between items-center mb-3'>
                        <div className='flex items-center gap-2 '>
                            <Link to={`/profile/${suggestion._id}`}>
                                <img src={suggestion.photo} alt="" className='w-10 h-10 rounded-full' />
                            </Link>
                                <div>
                                    <Link to={`/profile/${suggestion._id}`}>
                                        <h3 className='font-bold text-sm hover:underline'>{suggestion.name}</h3>
                                    </Link>
                                    <p className='text-gray-500 text-sm'>{suggestion.username}</p>
                                </div>
                        </div>
                        <button
                            onClick={() => handleFollowUser(suggestion._id)}
                            className={`${profileData.following?.includes(suggestion._id) ? " bg-green-50 hover:bg-green-100 text-green-600  "   : "bg-blue-50 hover:bg-blue-100 text-blue-600 " }   w-fit cursor-pointer text-sm font-bold rounded-xl p-2 flex items-center gap-2`}
                            disabled={followLoading === suggestion._id}
                        >
                            {followLoading === suggestion._id ?
                                <Spinner size="sm" /> 
                            : profileData.following?.includes(suggestion._id) ?
                                <FaUserCheck/> 
                            :
                                <IoPersonAdd/>
                            }
                            
                            <span className='hidden xl:block'>
                                {    followLoading === suggestion._id
                                ?
                                    "Updating..."
                                    : profileData.following?.includes(suggestion._id)
                                    ? "Following"
                                    : "Follow"
                                }
                            </span>
                        
                        </button>
                            </div>
                        <div className='flex gap-3'>
                            <span className='text-gray-500 text-sm' >{suggestion.followersCount} followers</span>
                            <span className='text-blue-400 text-sm' >1 multual</span>
                        </div>
                    </div>
                </div>
        </>
    )
}
