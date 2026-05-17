import React , { useState } from 'react';

import CommentComponent from '../CommentComponent/CommentComponent';
import { createComment } from '../../services/CommentServices';
import CreateComment from '../CommentComponent/CreateComment/CreateComment';
import { Spinner } from '@heroui/react';

export default function PostFooter({ comments,setNumOfComments , setComments , postId , userId , loadingComment,commentBody,setCommentBody  }) {
    const [commentloading, setCommentloading] = useState(false)
    
    async function handleSubmitComment({ text, image, reset }) {
    
        try {
            setCommentloading(true)
            const formData = new FormData();
            if (text) {
                formData.append("content", text)
            }
            if (image) {
                formData.append("image", image)
            }
            const response = await createComment(postId, formData)
            setComments(prev => [
                response.data.data.comment,
                ...prev
            ])
            setNumOfComments((prevCount) => (prevCount || 0) + 1);
            reset()
        } catch (error) {
            console.log(error)
        } finally {
            setCommentloading(false)
        }
    }
    
    return (
        <>  
            <div className="pstFooter p-2">
                {loadingComment ?
                    <div className="text-center text-gray-500 py-10 flex items-center gap-2 justify-center">
                        <Spinner color='text-gray-500'/> Loading Post Comments...
                    </div>
                    :comments.length===0 ?
                    <div className="text-center text-gray-500 py-10">
                        <p className='text-xl'>No Comments Yet</p>
                        <p className='text-sm'>Be First Person Create Comment For This Post </p>
                    </div>
                    :
                    <>
                        <div className="h-70 overflow-y-auto">
                            {comments.map((comment)=>(
                                <React.Fragment key={comment._id}>
                                    <CommentComponent
                                        comment={comment} 
                                        postId={postId} 
                                        userId={userId} 
                                        setComments={setComments}
                                        setNumOfComments={setNumOfComments} 
                                    />
                                </React.Fragment>
                            ))}
                        </div>
                                                
                    </> 
                }
            </div>
            <CreateComment
                value={commentBody}
                setValue={setCommentBody}
                placeholder="Write a Comment"
                loading={commentloading}
                onSubmit={handleSubmitComment}
            />

        </>
    )
}
