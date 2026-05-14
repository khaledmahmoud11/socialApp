import axios from "axios";
import Cookies from 'js-cookie';

const base_url = import.meta.env.VITE_BASE_URL ;
export async function getAllComments(postId) {

    const token = Cookies.get('userToken');
    
    let data = await axios.get(`${base_url}/posts/${postId}/comments?page=1&limit=10`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}
export async function createComment(postId,formData) {

    const token = Cookies.get('userToken');
    
    let data = await axios.post(`${base_url}/posts/${postId}/comments`, formData, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}

export async function DeleteComment( postId ,commentId ) {

    const token = Cookies.get('userToken');
    
    let data = await axios.delete(`${base_url}/posts/${postId}/comments/${commentId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}

export async function editComment(postId,commentId,formData) {

    const token = Cookies.get('userToken');
    
    let data = await axios.put(`${base_url}/posts/${postId}/comments/${commentId}`, formData, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}


export async function getAllReplies(postId,commentID) {

    const token = Cookies.get('userToken');
    
    let data = await axios.get(`${base_url}/posts/${postId}/comments/${commentID}/replies?page=1&limit=10`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}
export async function createReply(postId,commentID,formData) {

    const token = Cookies.get('userToken');
    
    let data = await axios.post(`${base_url}/posts/${postId}/comments/${commentID}/replies`, formData, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}

export async function likeComment(postId,commentId) {

    const token = Cookies.get('userToken');
    
    let data = await axios.put(`${base_url}/posts/${postId}/comments/${commentId}/like`,{}, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}