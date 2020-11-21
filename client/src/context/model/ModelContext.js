import Axios from "axios";
import React, { createContext } from "react"
import { useEffect } from "react";
import { useState } from "react";

export const ModelContext = createContext();

export const ModelProvider = (props) => {
    const [models, setModels] = useState([])
    useEffect(()=>{
        Axios.get("http://localhost:8080/api/get/modelxe").then((response)=>{
            setModels(response.data)
        })
    },[])
    return (
        <ModelContext.Provider value ={[models, setModels]}>
            {props.children}
        </ModelContext.Provider>
    )

}