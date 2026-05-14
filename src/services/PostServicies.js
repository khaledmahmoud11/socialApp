import axios from "axios";
import Cookies from 'js-cookie';

const base_url = import.meta.env.VITE_BASE_URL ;
export async function getAllPosts() {

    const token = Cookies.get('userToken');
    
    let data = await axios.get(`${base_url}/posts`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}
export async function getHomeFeedPosts() {

    const token = Cookies.get('userToken');
    
    let data = await axios.get(`${base_url}/posts/feed?only=following&limit=10`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}
export async function getMyPosts(userId) {

    const token = Cookies.get('userToken');
    
    let data = await axios.get(`${base_url}/users/${userId}/posts`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}
export async function getPostDetails(id) {

    const token = Cookies.get('userToken');
    
    let data = await axios.get(`${base_url}/posts/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}


export async function createPost(formData) {

    const token = Cookies.get('userToken');
    
    let data = await axios.post(`${base_url}/posts`, formData , {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}

export async function DeletePost(postId) {

    const token = Cookies.get('userToken');
    
    let data = await axios.delete(`${base_url}/posts/${postId}` , {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}


export async function editPost(postId,formData) {

    const token = Cookies.get('userToken');
    
    let data = await axios.put(`${base_url}/posts/${postId}`, formData , {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}

export async function sharePost(postID, body) {
    const token = Cookies.get('userToken');

    let data = await axios.post(
        `${base_url}/posts/${postID}/share`,body,
        {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
        }
    );

    return data;
}

export async function BookmarkPost(postId) {

    const token = Cookies.get('userToken');
    
    let data = await axios.put(`${base_url}/posts/${postId}/bookmark` , {} , {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}