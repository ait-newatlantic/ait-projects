import Axios from "axios";
import React, { createContext } from "react"
import { useEffect } from "react";
import { useState } from "react";
import api from "../../api/index"

export const BranchContext = createContext();

export const BranchProvider = (props) => {
    const [branches, setBranches] = useState([])
    useEffect(()=>{
        api.get("/api/get/chinhanh").then((response)=>{
            setBranches(response.data)
        })
    },[])
    return (
        <BranchContext.Provider value ={[branches, setBranches]}>
            {props.children}
        </BranchContext.Provider>
    )

}