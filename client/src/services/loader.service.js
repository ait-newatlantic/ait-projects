import React, { useState } from "react"
import Loader from "../components/Loader/FullPageLoader"

export default function useFullPageLoader () {
    const [loading, setLoading] = useState(false)
    return[
        loading? <Loader/> :null,
        () => setLoading(true),
        () => setLoading(false) 
    ]

}