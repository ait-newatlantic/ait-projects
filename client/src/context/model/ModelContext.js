import React, { createContext } from "react"
import { useEffect } from "react";
import { useState } from "react";
import CarService from "../../services/car.service"

export const ModelContext = createContext();

export const ModelProvider = (props) => {
    const [models, setModels] = useState([])
    useEffect(()=>{
        CarService.get_car_models().then((response)=>{
            setModels(response.data)
        })
    },[])
    return (
        <ModelContext.Provider value ={[models, setModels]}>
            {props.children}
        </ModelContext.Provider>
    )

}