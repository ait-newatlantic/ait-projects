import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL
const API_URL = `${BASE_URL}/api/`

console.log(API_URL)

const get_car_models = () => {
    return axios.get(API_URL + "car_models",);
};

const get_car_types = () => {
    return axios.get(API_URL + "car_types",);
};


export default {
    get_car_models,
    get_car_types,
};