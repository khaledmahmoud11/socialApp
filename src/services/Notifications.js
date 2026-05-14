import axios from "axios";
import Cookies from 'js-cookie';
const base_url = import.meta.env.VITE_BASE_URL ;

export async function getAllNotifications() {

    const token = Cookies.get('userToken');
    
    let data = await axios.get(`${base_url}/notifications`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}