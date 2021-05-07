import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL
const API_URL = `${BASE_URL}/api/`

console.log(API_URL)

const get_business_types = () => {
    return axios.get(API_URL + `business-types`);
};

const get_business_type_by_name = (business_type_name) => {
    return axios.get(API_URL + `business-types/name`, {
        params:{
            business_type_name
        }
    });
};

const BusinessTypeService = {
    get_business_types,
    get_business_type_by_name,
}

export default BusinessTypeService;