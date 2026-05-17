import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import Cookies from "js-cookie";

const base_url = import.meta.env.VITE_BASE_URL ;


export const AuthContext = createContext();
export default function AuthContextProvider({children}) {

    const [token, setToken] = useState(null)

    const [profileData, setProfileData] = useState(null)

    const [loading, setLoading] = useState(true);
    
    
    useEffect(() => {
        const userToken = Cookies.get("userToken");

        if (userToken) {
            setToken(userToken);
            
        } else {
            setLoading(false); 
        }
    }, []);


    async function getUserProfile(){

        try {
            const token = Cookies.get("userToken");
            const data = await axios.get(
                `${base_url}/users/profile-data`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setProfileData(data.data.data.user);
            return data.data.data.user;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {

        if (token) {
            getUserProfile();
        }

    }, [token]);

    function logout() {

        Cookies.remove("userToken");

        setToken(null);

        setProfileData(null);
    }

    
    return (
        <AuthContext.Provider value={{
                token,
                setToken,
                profileData,
                loading,
                logout,
                setProfileData
        }}>
            {children}
        </AuthContext.Provider>
    )
}
