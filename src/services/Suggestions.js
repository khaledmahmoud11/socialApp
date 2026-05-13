import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL ;

export async function getFollowSuggestions() {

    let token = localStorage.getItem("userToken")
    console.log(token,"check token")
    let data = await axios.get(`${base_url}/users/suggestions?limit=10`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}

export async function followUser(userId) {
    const token = localStorage.getItem("userToken");

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