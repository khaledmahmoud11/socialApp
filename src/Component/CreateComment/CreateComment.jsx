import { Input } from '@heroui/react';
import React from 'react'

export default function CreateComment() {



    return (
        <>
                {/* <Input
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
                        <button disabled={!commentBody && !sendingPhoto} onClick={()=>handleSubmitComment(id)} className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-blue-300 ${!commentloading ? 'text-blue-600 bg-white' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}> {!commentloading ? <IoSend /> :    <Spinner size='sm' />  }  </button>
                    </div>
                </div>


                <div>
                    {displayPhoto  &&  
                        <div className='relative'>
                            <img src={displayPhoto} alt='commentPhoto' className='w-full h-50 object-cover rounded-xl' />
                            <span onClick={()=>deleteDisplayPhoto()} className='bg-gray-900 rounded-full p-2 text-white absolute top-2.5 right-2.5 cursor-pointer'> <IoCloseSharp /></span>
                        </div> 
                        }
                </div> */}

        </>
    )
}
