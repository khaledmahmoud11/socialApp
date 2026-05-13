import axios from "axios";
const base_url = import.meta.env.VITE_BASE_URL ;
import Cookies from 'js-cookie';

export async function changeProfileImage(formData) {

    const token = Cookies.get('userToken');
    
    let data = await axios.put(`${base_url}/users/upload-photo`, formData , {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}
export async function userProfile(userID) {

    const token = Cookies.get('userToken');
    
    let data = await axios.get(`${base_url}/users/${userID}/profile`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}