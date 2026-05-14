import {Button, Input, Spinner} from "@heroui/react";
import { CiSearch } from "react-icons/ci";
import SuggestionsSkeleton from '../../Component/Skeletons/SuggestionsSkeleton';
import { IoPersonAdd } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { followUser } from "../../services/Suggestions";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function SuggestedFriends({suggestions,handleFollowSuggestion}) {

    const {profileData} = useContext(AuthContext);
    const [followLoading, setFollowLoading] = useState(null);
    const [searchInput, setsearchInput] = useState("")
    async function handleFollowUser(userID){
        try {
            setFollowLoading(userID);
            const response = await followUser(userID);
            console.log(response,"response after follow");
            handleFollowSuggestion();
        } catch (error) {
            console.log(error)
        }finally{
            setFollowLoading(null);
        }
        
    }
    
    return (
        <>
            <div className='p-4 border-1 border-gray-100 shadow-md rounded-xl flex-col gap-2'>   
                <div className='flex justify-between items-center'>
                    <p className='flex items-center gap-2 '>
                        <span> <CiUser className='text-blue-600' /> </span>
                        <span className='font-bold'>Suggested Friends</span>
                    </p>
                    <span>5</span>
                    </div>

                    <Input 
                        type="search"
                        placeholder='Search Friends'
                        className='border border-gray-300 rounded-xl my-3'
                        startContent={<CiSearch />}
                        onChange={(e)=>setsearchInput(e.target.value)}
        
                    />
                    {suggestions.length === 0 ? <SuggestionsSkeleton /> : 
                        <>
                            {suggestions.filter((suggestion)=>suggestion.name.toLowerCase().includes(searchInput.toLowerCase())).map((suggestion)=>{
                                return (                     
                                <div className="suggest" key={suggestion._id}>
                                    <div className='border border-gray-300 rounded-xl p-3 mb-3'>
                                        <div className='flex justify-between items-center mb-3'>
                                            <div className='flex items-center gap-2 '>
                                                <img src={suggestion.photo} alt="" className='w-10 h-10 rounded-full' />
                                                <div>
                                                    <h3 className='font-bold text-sm'>{suggestion.name}</h3>
                                                    <p className='text-gray-500 text-sm'>{suggestion.username}</p>
                                                </div>
                                            </div>
                                            <Button
                                                onClick={() => handleFollowUser(suggestion._id)}
                                                className={`${profileData.following?.includes(suggestion._id) ? "bg-green-50 hover:bg-green-100 text-green-600  "   : "bg-blue-50 hover:bg-blue-100 text-blue-600 " }   cursor-pointer text-sm font-bold rounded-xl p-2 flex items-center gap-2`}
                                                disabled={followLoading === suggestion._id}
                                            >
                                                {followLoading === suggestion._id ? <Spinner size="sm" /> : <IoPersonAdd />}

                                                {followLoading === suggestion._id ? "Following" : "Follow"}
                                            </Button>
                                        </div>
                                        <div className='flex gap-3'>
                                            <span className='text-gray-500 text-sm' >{suggestion.followersCount} followers</span>
                                            <span className='text-blue-400 text-sm' >1 multual</span>
                                        </div>
                                    </div>
                                </div>
                                )
                            })}                                    
                        </> 
                    }

            </div>
        </>
    )
}
