import { Input } from '@heroui/react';
import React, { useRef, useState } from 'react'

export default function CreateComment({commentBody, setCommentBody}) {

    const photoComment = useRef();


    const [displayPhoto, setDisplayPhoto] = useState("")
    const [sendingPhoto, setSendingPhoto] = useState("")
    const [commentloading, setCommentloading] = useState(false)
    const [commentloading, setCommentloading] = useState(false)


    function clickPhotoIcon(){
        photoComment.current.click();
    }
    function selectPhotoComment(){
        setSendingPhoto(photoComment.current.files[0])
        setDisplayPhoto(URL.createObjectURL(photoComment.current.files[0]))
    }
    function deleteDisplayPhoto(){
        setSendingPhoto("")
        setDisplayPhoto("")
    }


    async function handleSubmitComment(id){
        try{
            setCommentloading(true)
            const formData = new FormData();
            if(commentBody){
                formData.append("content",commentBody)
            }
            if(sendingPhoto){
                formData.append("image",sendingPhoto)
            }
            const response = await createComment(id,formData)
            console.log(response)
            setCommentBody("")
            setDisplayPhoto("")
            setSendingPhoto("")
            fetchAllComments(id)
            }catch(error){
            console.log(error)
            }finally{
            setCommentloading(false)
            }
        
        }
    return (
        <>
            <div className=' p-4 border-2 border-transparent focus-within:border-2 focus-within:border-gray-300 rounded-xl'>
                <Input
                    placeholder='Write a Comment '
                    className='mb-3'
                    onChange={(e)=>setCommentBody(e.target.value)}
                    value={commentBody}          
                />

                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-3'>
                    <span onClick={()=>clickPhotoIcon()} className='cursor-pointer' > <FaImage /> </span>
                    <Input 
                        type='file' 
                        ref={photoComment} 
                        className='hidden'
                        onInput={()=>selectPhotoComment()}
                    />
                    <span> <MdOutlineEmojiEmotions /> </span>
                    </div>
                    <div>
                    <button disabled={!commentBody && !sendingPhoto} onClick={()=>handleSubmitComment(id)} className={`p-2 rounded-full cursor-pointer hover:bg-blue-300 ${!commentloading ? 'text-blue-600 bg-white' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}> {!commentloading ? <IoSend /> :    <FaHourglassEnd />  }  </button>
                    </div>
                    
                </div>
                <div>
                    {displayPhoto  &&  
                    <div className='relative'>
                        <img src={displayPhoto} alt='commentPhoto' className='w-full h-50 object-cover rounded-xl' />
                        <span onClick={()=>deleteDisplayPhoto()} className='bg-gray-900 rounded-full p-2 text-white absolute top-2.5 right-2.5 cursor-pointer'> <IoCloseSharp /></span>
                    </div> 
                    }
                </div>   
                </div>
        </>
    )
}
