import React, { createContext, useEffect, useState} from 'react';
import { getNotificationsCount } from '../services/Notifications';
import Cookies from "js-cookie";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [count, setCount] = useState(0);

    

    async function fetchNotificationsCount(){
        try {
            const response = await getNotificationsCount();
            console.log(response,"response of notifications counter from context")
            setCount(response.data.data.unreadCount)

        } catch (error) {
        console.error("Error fetching notifications:", error);
        }
    };

    useEffect(()=>{
        fetchNotificationsCount();
    },[count])

    return (
        <NotificationContext.Provider value={{ count, fetchNotificationsCount, setCount }}>
        {children}
        </NotificationContext.Provider>
    );
};

