import {Button, Input, Spinner} from "@heroui/react";
import { CiSearch } from "react-icons/ci";
import SuggestionsSkeleton from '../../Component/Skeletons/SuggestionsSkeleton';
import { IoPersonAdd } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router";
import SuggestionCard from "../SuggestionCard/SuggestionCard";

export default function SuggestedFriends({suggestions,isLaodingSuggestion}) {

    const [searchInput, setsearchInput] = useState("")    
    return (
        <>
            <div className='p-4 border-1 border-gray-100 shadow-md rounded-xl flex-col gap-2'>   
                <div className='flex justify-between items-center'>
                    <p className='flex items-center gap-2 '>
                        <span> <CiUser className='text-blue-600' /> </span>
                        <span className='font-bold'>Suggested Friends</span>
                    </p>
                    <span className="lg:hidden" >
                        <Link
                            to="/suggestions"
                            className="mt-3 flex items-center justify-center w-full gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-bold text-blue-700 hover:bg-blue-200 hover:border-slate-300 transition-all"
                        >
                            Show
                        </Link>
                    </span>
                    </div>

                    <div className="hidden lg:block">
                        <Input 
                            type="search"
                            placeholder='Search Friends'
                            className='border border-gray-300 rounded-xl my-3'
                            startContent={<CiSearch />}
                            onChange={(e)=>setsearchInput(e.target.value)}
            
                        />
                        {isLaodingSuggestion ? <SuggestionsSkeleton /> : suggestions.length === 0 ?  
                            <>
                                <p className="text-center text-gray-500"> No Suggested Friends</p>                               
                            </>
                        :
                            <>
                                {suggestions.filter((suggestion)=>suggestion.name.toLowerCase().includes(searchInput.toLowerCase())).slice(0,5).map((suggestion)=>{
                                    return (                     
                                        <SuggestionCard suggestion={suggestion} />
                                    )
                                })}  
                                
                            </>
                        }
                        <Link
                            to="/suggestions"
                            className="mt-3 flex items-center justify-center w-full gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-200 hover:border-slate-300 transition-all"
                        >
                            View More
                        </Link>
                    </div>

            </div>
        </>
    )
}
