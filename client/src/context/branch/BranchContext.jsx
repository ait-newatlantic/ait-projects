import Axios from "axios";
import React, { createContext } from "react"
import { useEffect } from "react";
import { useState } from "react";

export const BranchContext = createContext();

export const BranchProvider = (props) => {
    const [branches, setBranches] = useState([])
    useEffect(()=>{
        Axios.get("http://localhost:8080/api/get/nhaplieu/chinhanh").then((response)=>{
            setBranches(response.data)
        })
    },[])
    return (
        <BranchContext.Provider value ={[branches, setBranches]}>
            {props.children}
        </BranchContext.Provider>
    )

}