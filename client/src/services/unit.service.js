import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = `${BASE_URL}/api/`;

const get_units = () => {
    return axios.get(API_URL + `units`);
};

const UnitService = {
    get_units
};

export default UnitService;
