import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL

console.log(API_URL)

const create_customer = (
    customer,
    customer_number,
    customer_representative,
    customer_representative_number,
    customer_representative_email,
    customer_area,
    customer_taxcode,
    customer_type,
    customer_address
) => {
    return axios.post(API_URL + "api/customers", {
        customer,
        customer_number,
        customer_representative,
        customer_representative_number,
        customer_representative_email,
        customer_area,
        customer_taxcode,
        customer_type,
        customer_address
    });
};

const get_specific_customer = (id) => {
    return axios.get(API_URL + `api/customers/${id}`);
};

const update_specific_customer = (
    id,
    customer_representative,
    customer_representative_email,
    customer_representative_number,
    ) => {
    return axios.put(API_URL + `api/customers/${id}`, {
        customer_representative,
        customer_representative_email,
        customer_representative_number,
    });
};

export default {
    create_customer,
    get_specific_customer,
    update_specific_customer,
};