import React, { createContext } from "react"
import { useEffect } from "react";
import { useState } from "react";
import CustomerService from "../../services/customer.service"


export const CustomerContext = createContext();

export const CustomerProvider = (props) => {
    const [customers, setCustomers] = useState([])
    useEffect(()=>{
        CustomerService.get__customers().then((response)=>{
            setCustomers(response.data)
        })
    },[])
    return (
        <CustomerContext.Provider value ={[customers, setCustomers]}>
            {props.children}
        </CustomerContext.Provider>
    )

}