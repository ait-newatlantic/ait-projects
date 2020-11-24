import React, { createContext } from "react"
import { useEffect } from "react";
import { useState } from "react";
import api from "../../api/index"

export const ProvinceContext = createContext();

export const ProvinceProvider = (props) => {
    const [provinces, setProvinces] = useState([])
    useEffect(()=>{
        api.get("/api/get/tinhthanh").then((response)=>{
            setProvinces(response.data)
        })
    },[])
    return (
        <ProvinceContext.Provider value ={[provinces, setProvinces]}>
            {props.children}
        </ProvinceContext.Provider>
    )

}