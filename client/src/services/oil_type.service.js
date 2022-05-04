import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = `${BASE_URL}/api/`;

const get_oil_types = () => {
    return axios.get(API_URL + `oil_types`);
};

const OilTypeService = {
    get_oil_types
};

export default OilTypeService;
