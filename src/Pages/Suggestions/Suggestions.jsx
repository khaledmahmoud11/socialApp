import React, { useContext, useEffect, useState } from 'react'
import { LuUsers } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { Button, Input, Spinner } from '@heroui/react';
import { AuthContext } from '../../Context/AuthContext';
import { getFollowSuggestions } from '../../services/Suggestions';
import SuggestionCard from '../../Component/SuggestionCard/SuggestionCard';
import SuggestionsSkeleton from '../../Component/Skeletons/SuggestionsSkeleton';


export default function Suggestions() {

    const {profileData} = useContext(AuthContext);
    console.log(profileData)
    const [allSuggestions, setAllSuggestions] = useState([])
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
    
    const [searchInput, setsearchInput] = useState("")
    const [pageNumber, setPageNumber] = useState(1)

    async function fetchAllSuggestions(page){
        try {
            setIsLoadingSuggestions(true);
            const response = await getFollowSuggestions(page);
            const newSuggestions = response.data.data.suggestions;
            setAllSuggestions((prev) => {
                return page === 1 ? newSuggestions : [...prev, ...newSuggestions];
            });
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoadingSuggestions(false);
        }
    }
    function handleViewMore(){
        const nextPage = pageNumber + 1;

        setPageNumber(nextPage);

        fetchAllSuggestions(nextPage);
    }
    const filteredSuggestions = allSuggestions.filter((suggestion) =>
        suggestion.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    
    useEffect(()=>{
        fetchAllSuggestions(1);
    },[])


    return (
        <>
            <div className="mx-auto my-10 p-5 border border-gray-200 rounded-xl w-full max-w-4xl shadow-md ">

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span> <LuUsers className='text-blue-500' /> </span>
                        <h2 className='font-bold text-black'> Suggested Friends </h2>
                    </div>
                    <span className='rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600'>{filteredSuggestions.length}</span>
                </div>

                <div>
                    <Input 
                        type="search"
                        placeholder='Search Friends'
                        className='border border-gray-300 rounded-xl my-3'
                        startContent={<CiSearch />}
                        onChange={(e)=>setsearchInput(e.target.value)}
        
                    />
                </div>

                <div className="Suggested Friends">
                    
                        {isLoadingSuggestions && pageNumber===1 ?
                            <>
                                <div className="text-center text-gray-500 py-10">
                                    <Spinner size='sm' color='text-gray-500'/> please wait for loading suggestin ...
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {[1,2,3,4].map(()=>(<SuggestionsSkeleton />))}
                                </div>
                            </>
                            :
                            allSuggestions.length===0 ?
                                <div className="text-center text-gray-500 py-10">
                                    No Suggested Friends .
                                </div>
                            :
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {
                                    filteredSuggestions.filter((suggestion)=>suggestion.name.toLowerCase().includes(searchInput.toLowerCase())).map((suggestion)=>(
                                        <SuggestionCard suggestion={suggestion}/>
                                    ))
                                }
                            </div>
                            
                        }
                        
                    
                </div>

                <div>
                    <Button
                        onClick={()=>handleViewMore()}
                        className="mt-3 flex items-center justify-center w-full gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-200 hover:border-slate-300 transition-all"
                    >
                        View More
                    </Button>
                </div>
            </div>
        </>
    )
}
