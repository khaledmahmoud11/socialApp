import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL ;
export async function createLike(postId) {

    let token = localStorage.getItem("userToken")
    console.log(token,"check token")
    let data = await axios.put(`${base_url}/posts/${postId}/like`,{}, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}


export async function getPostLikes(postId) {
    let token = localStorage.getItem("userToken");

    let data = await axios.get(`${base_url}/posts/${postId}/likes?page=1&limit=20`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
}