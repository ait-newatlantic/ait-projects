import Axios from "axios";
import React, { createContext } from "react"
import { useEffect } from "react";
import { useState } from "react";
import api from "../../api/index"

export const CustomerContext = createContext();

export const CustomerProvider = (props) => {
    const [customers, setCustomers] = useState([])
    useEffect(()=>{
        api.get("/api/get/khachhang").then((response)=>{
            setCustomers(response.data)
        })
    },[])
    return (
        <CustomerContext.Provider value ={[customers, setCustomers]}>
            {props.children}
        </CustomerContext.Provider>
    )

}