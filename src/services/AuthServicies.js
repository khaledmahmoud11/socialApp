import axios from "axios";
import Cookies from 'js-cookie';
const base_url = import.meta.env.VITE_BASE_URL ;
export async function userRegister(body) {
    let data = await axios.post(`${base_url}/users/signup`, body, {
        headers: {
            "Content-Type": "application/json"
        }
    })

    return data;
}

export async function userLogin(body) {
    let data = await axios.post(`${base_url}/users/signin`, body, {
        headers: {              
            "Content-Type": "application/json"
        }
    })

    return data;
}

export async function updatePassword(body) {
    const token = Cookies.get('userToken');
    let data = await axios.patch(`${base_url}/users/change-password`, body, {
        headers: {              
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}
