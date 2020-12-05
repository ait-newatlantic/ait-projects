import React, { createContext } from "react"
import { useEffect } from "react";
import { useState } from "react";
import ProvinceService from "../../services/province.service"

export const ProvinceContext = createContext();

export const ProvinceProvider = (props) => {
    const [provinces, setProvinces] = useState([])
    useEffect(()=>{
        ProvinceService.get_provinces().then((response)=>{
            setProvinces(response.data)
        })
    },[])
    return (
        <ProvinceContext.Provider value ={[provinces, setProvinces]}>
            {props.children}
        </ProvinceContext.Provider>
    )

}