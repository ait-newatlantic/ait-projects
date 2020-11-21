import Axios from "axios";
import React, { createContext } from "react"
import { useEffect } from "react";
import { useState } from "react";

export const TypeContext = createContext();

export const TypeProvider = (props) => {
    const [types, setTypes] = useState([])
    useEffect(()=>{
        Axios.get("http://localhost:8080/api/get/loaixe").then((response)=>{
            setTypes(response.data)
        })
    },[])
    return (
        <TypeContext.Provider value ={[types, setTypes]}>
            {props.children}
        </TypeContext.Provider>
    )

}