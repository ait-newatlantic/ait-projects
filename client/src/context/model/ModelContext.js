import React, { createContext } from "react"
import { useEffect } from "react";
import { useState } from "react";
import api from "../../api/index"

export const ModelContext = createContext();

export const ModelProvider = (props) => {
    const [models, setModels] = useState([])
    useEffect(()=>{
        api.get("/api/car_models").then((response)=>{
            setModels(response.data)
        })
    },[])
    return (
        <ModelContext.Provider value ={[models, setModels]}>
            {props.children}
        </ModelContext.Provider>
    )

}