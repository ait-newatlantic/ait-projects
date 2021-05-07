import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL
const API_URL = `${BASE_URL}/api/`

console.log(API_URL)

const get_customer_types = () => {
    return axios.get(API_URL + `customer-types`);
};

const CustomerTypeService = {
    get_customer_types,
}

export default CustomerTypeService;