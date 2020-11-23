import Axios from "axios";
import React, { createContext } from "react"
import { useEffect } from "react";
import { useState } from "react";

export const CustomerContext = createContext();

export const CustomerProvider = (props) => {
    const [customers, setCustomers] = useState([])
    useEffect(()=>{
        Axios.get("http://localhost:8080/api/get/khachhang").then((response)=>{
            setCustomers(response.data)
        })
    },[])
    return (
        <CustomerContext.Provider value ={[customers, setCustomers]}>
            {props.children}
        </CustomerContext.Provider>
    )

}