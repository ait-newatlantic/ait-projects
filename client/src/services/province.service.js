import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL

console.log(API_URL)

const get_provinces = () => {
    return axios.get(API_URL + "provinces",);
};


export default {
    get_provinces,
};