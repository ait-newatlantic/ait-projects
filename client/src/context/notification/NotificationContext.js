import Axios from "axios";
import React, { createContext } from "react"
import { useEffect } from "react";
import { useState } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = (props) => {
    const [notifications, setNotifications] = useState([])
    useEffect(()=>{
        Axios.get("http://localhost:8080/api/get/thongbao").then((response)=>{
            setNotifications(response.data)
        })
    },[])
    return (
        <NotificationContext.Provider value ={[notifications, setNotifications]}>
            {props.children}
        </NotificationContext.Provider>
    )

}