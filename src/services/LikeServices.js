import axios from "axios";
import Cookies from 'js-cookie';

const base_url = import.meta.env.VITE_BASE_URL ;
export async function createLike(postId) {

    const token = Cookies.get('userToken');
    
    let data = await axios.put(`${base_url}/posts/${postId}/like`,{}, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}


export async function getPostLikes(postId) {
    const token = Cookies.get('userToken');;

    let data = await axios.get(`${base_url}/posts/${postId}/likes?page=1&limit=20`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
}