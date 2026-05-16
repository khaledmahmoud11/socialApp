import { useState } from 'react';

import CommentComponent from '../CommentComponent/CommentComponent';

export default function PostFooter({ comments , setComments , postId , userId , loadingComment  }) {
    const [showMoreComments, setShowMoreComments] = useState(2)
    
    return (
        <>  
            <div className="pstFooter p-2">
                {comments && !loadingComment &&
                    <>
                        {comments.map((comment)=>(
                            <CommentComponent comment={comment} postId={postId} userId={userId} setComments={setComments} />
                        ))}
                                                
                    </> 
                }
            </div>
            {comments.length > showMoreComments && 
                <>
                    <button onClick={()=> setShowMoreComments(showMoreComments +2)} className='text-blue-600 cursor-pointer p-3 hover:underline'>view more comments</button>
                </>
            }
        </>
    )
}
