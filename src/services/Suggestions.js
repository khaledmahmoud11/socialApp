import axios from "axios";
import Cookies from 'js-cookie';

const base_url = import.meta.env.VITE_BASE_URL ;

export async function getFollowSuggestions(page) {

    const token = Cookies.get('userToken');
    
    let data = await axios.get(`${base_url}/users/suggestions?limit=20&page=${page}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}

export async function followUser(userId) {
    const token = Cookies.get('userToken');

    const response = await axios.put(
        `${base_url}/users/${userId}/follow`,
        {},
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        }
    );

    return response.data;
}