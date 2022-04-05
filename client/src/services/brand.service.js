import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = `${BASE_URL}/api/`;

const get_brands = () => {
    return axios.get(API_URL + `brands`);
};

const BrandService = {
    get_brands
};

export default BrandService;
