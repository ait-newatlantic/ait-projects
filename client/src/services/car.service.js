import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL

console.log(API_URL)

const get_car_models = () => {
    return axios.get(API_URL + "api/car_models",);
};

const get_car_types = () => {
    return axios.get(API_URL + "api/car_types",);
};


export default {
    get_car_models,
    get_car_types,
};