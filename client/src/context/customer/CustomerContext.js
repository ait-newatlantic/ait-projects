import React, { createContext } from "react"
import { useEffect } from "react";
import { useState } from "react";
import CustomerService from "../../services/customer.service"
import AuthService from "../../services/auth.service";

export const CustomerContext = createContext();

export const CustomerProvider = (props) => {
    const [user, setUser] = useState("")
    const [customers, setCustomers] = useState([])
    const currentUser = AuthService.getCurrentUser();
    useEffect(() => {
        if (currentUser.username.split('.')[0] === "AIT") {
            CustomerService.get_customers().then((response) => {
                setCustomers(response.data)
            })
        }
        else{
            CustomerService.get_specific_customers(currentUser.username.split('.')[0]).then((response) => {
                setCustomers(response.data)
            })
        }
    }, [])
    return (
        <CustomerContext.Provider value={[customers, setCustomers]}>
            {props.children}
        </CustomerContext.Provider>
    )

}