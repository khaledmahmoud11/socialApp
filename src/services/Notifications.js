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

export async function getUnreadNotifications() {

    const token = Cookies.get('userToken');
    
    let data = await axios.get(`${base_url}/notifications?unread=true`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}

export async function markNotificationAsRead(notificationId) {

    const token = Cookies.get('userToken');
    
    let data = await axios.patch(`${base_url}/notifications/${notificationId}/read`, {}, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}
export async function markAllNotification() {

    const token = Cookies.get('userToken');
    
    let data = await axios.patch(`${base_url}/notifications/read-all`, {}, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}