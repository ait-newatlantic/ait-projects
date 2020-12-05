import Axios from "axios";
import React, { createContext } from "react"
import { useEffect } from "react";
import { useState } from "react";
import CarService from "../../services/car.service"

export const TypeContext = createContext();

export const TypeProvider = (props) => {
    const [types, setTypes] = useState([])
    useEffect(()=>{
        CarService.get_car_types().then((response)=>{
            setTypes(response.data)
        })
    },[])
    return (
        <TypeContext.Provider value ={[types, setTypes]}>
            {props.children}
        </TypeContext.Provider>
    )

}