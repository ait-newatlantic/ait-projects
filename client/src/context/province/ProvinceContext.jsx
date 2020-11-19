import Axios from "axios";
import React, { createContext } from "react"
import { useEffect } from "react";
import { useState } from "react";

export const ProvinceContext = createContext();

export const ProvinceProvider = (props) => {
    const [provinces, setProvinces] = useState([])
    useEffect(()=>{
        Axios.get("http://localhost:8080/api/get/nhaplieu/tinhthanh").then((response)=>{
            setProvinces(response.data)
        })
    },[])
    return (
        <ProvinceContext.Provider value ={[provinces, setProvinces]}>
            {props.children}
        </ProvinceContext.Provider>
    )

}