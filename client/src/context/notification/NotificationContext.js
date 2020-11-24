import Axios from "axios";
import React, { createContext } from "react"
import { useEffect } from "react";
import { useState } from "react";
import api from "../../api/index"

export const NotificationContext = createContext();

export const NotificationProvider = (props) => {
    const [notifications, setNotifications] = useState([])
    useEffect(()=>{
        api.get("/api/get/thongbao").then((response)=>{
            setNotifications(response.data)
        })
    },[])
    return (
        <NotificationContext.Provider value ={[notifications, setNotifications]}>
            {props.children}
        </NotificationContext.Provider>
    )

}