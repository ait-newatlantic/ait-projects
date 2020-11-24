import Axios from "axios";
import React, { createContext } from "react"
import { useEffect } from "react";
import { useState } from "react";
import api from "../../api/index"

export const TypeContext = createContext();

export const TypeProvider = (props) => {
    const [types, setTypes] = useState([])
    useEffect(()=>{
        api.get("/api/get/loaixe").then((response)=>{
            setTypes(response.data)
        })
    },[])
    return (
        <TypeContext.Provider value ={[types, setTypes]}>
            {props.children}
        </TypeContext.Provider>
    )

}