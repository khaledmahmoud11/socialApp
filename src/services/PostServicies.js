import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL ;
export async function getAllPosts() {

    let token = localStorage.getItem("userToken")
    console.log(token,"check token")
    let data = await axios.get(`${base_url}/posts`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}
export async function getHomeFeedPosts() {

    let token = localStorage.getItem("userToken")
    console.log(token,"check token")
    let data = await axios.get(`${base_url}/posts/feed?only=following&limit=10`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}
export async function getMyPosts(userId) {

    let token = localStorage.getItem("userToken")
    console.log(token,"check token")
    let data = await axios.get(`${base_url}/users/${userId}/posts`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}
export async function getPostDetails(id) {

    let token = localStorage.getItem("userToken")
    console.log(token,"check token")
    let data = await axios.get(`${base_url}/posts/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}


export async function createPost(formData) {

    let token = localStorage.getItem("userToken")
    console.log(token,"check token")
    let data = await axios.post(`${base_url}/posts`, formData , {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}

export async function DeletePost(postId) {

    let token = localStorage.getItem("userToken")
    console.log(token,"check token")
    let data = await axios.delete(`${base_url}/posts/${postId}` , {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}


export async function editPost(postId,formData) {

    let token = localStorage.getItem("userToken")
    console.log(token,"check token")
    let data = await axios.put(`${base_url}/posts/${postId}`, formData , {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}

export async function sharePost(postID,formData) {

    let token = localStorage.getItem("userToken")
    console.log(token,"check token")
    let data = await axios.post(`${base_url}/posts/${postID}/share`, formData , {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}