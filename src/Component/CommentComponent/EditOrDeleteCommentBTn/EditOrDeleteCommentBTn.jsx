import React, { useContext } from 'react'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Input, Spinner} from "@heroui/react";
import { BsThreeDots } from 'react-icons/bs';
import { AuthContext } from '../../../Context/AuthContext';



export default function EditOrDeleteCommentBTn({comment,postId,changeInput,handleDeleteComment}) {
    let {profileData}=useContext(AuthContext)
    return (
        <>
            <Dropdown >
                <DropdownTrigger className='bg-transparent hover:bg-gray-300 transition-all duration-200'>
                    <Button > <BsThreeDots /> </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    { comment.commentCreator._id === profileData.id && <DropdownItem key="edit" className='cursors pointer' onClick={()=>changeInput(comment)} >Edit Comment</DropdownItem>}
                    <DropdownItem 
                        key="delete" 
                        className="text-danger cursor-pointer" color="danger" 
                        onClick={()=>handleDeleteComment( postId , comment._id)}
                    >
                        Delete Comment
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}
