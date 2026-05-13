import axios from "axios";
const base_url = import.meta.env.VITE_BASE_URL ;

export async function changeProfileImage(formData) {

    let token = localStorage.getItem("userToken")
    console.log(token,"check token")
    let data = await axios.put(`${base_url}/users/upload-photo`, formData , {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}
export async function userProfile(userID) {

    let token = localStorage.getItem("userToken")
    console.log(token,"check token")
    let data = await axios.get(`${base_url}/users/${userID}/profile`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}