import React, { useRef, useState } from 'react'
import { Input, Spinner } from '@heroui/react'
import { FaImage } from "react-icons/fa6";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";

export default function CreateComment({
    value,
    setValue,
    placeholder,
    onSubmit,
    loading,
    wrapperClass = ""
}) {

    const photoRef = useRef();

    const [displayPhoto, setDisplayPhoto] = useState("");
    const [sendingPhoto, setSendingPhoto] = useState("");

    function clickPhotoIcon() {
        photoRef.current.click();
    }

    function selectPhoto() {
        const file = photoRef.current.files[0];

        setSendingPhoto(file);
        setDisplayPhoto(URL.createObjectURL(file));
    }

    function deletePhoto() {
        setSendingPhoto("");
        setDisplayPhoto("");
    }

    function handleSubmit() {
        onSubmit({
            text: value,
            image: sendingPhoto,
            reset: () => {
                setValue("");
                setSendingPhoto("");
                setDisplayPhoto("");
            }
        });
    }

    return (
        <div className={`w-full p-4 border-2 border-transparent focus-within:border-gray-300 rounded-xl ${wrapperClass}`}>

            <Input
                placeholder={placeholder}
                className='mb-3'
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />

            <div className='flex justify-between items-center'>

                <div className='flex items-center gap-3'>

                    <span
                        onClick={clickPhotoIcon}
                        className='cursor-pointer'
                    >
                        <FaImage />
                    </span>

                    <Input
                        type='file'
                        ref={photoRef}
                        className='hidden'
                        onInput={selectPhoto}
                    />

                    <span>
                        <MdOutlineEmojiEmotions />
                    </span>

                </div>

                <button
                    disabled={!value && !sendingPhoto}
                    onClick={handleSubmit}
                    className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-blue-300 ${
                        !loading
                            ? 'text-blue-600 bg-white'
                            : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    }`}
                >
                    {!loading
                        ? <IoSend />
                        : <Spinner size='sm' />
                    }
                </button>

            </div>

            {displayPhoto && (
                <div className='relative mt-3'>

                    <img
                        src={displayPhoto}
                        alt='preview'
                        className='w-full h-50 object-cover rounded-xl'
                    />

                    <span
                        onClick={deletePhoto}
                        className='bg-gray-900 rounded-full p-2 text-white absolute top-2.5 right-2.5 cursor-pointer'
                    >
                        <IoCloseSharp />
                    </span>

                </div>
            )}

        </div>
    )
}