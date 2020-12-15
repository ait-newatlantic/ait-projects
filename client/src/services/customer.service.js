import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL
const API_URL = `${BASE_URL}/api/`

console.log(API_URL)

const create_customer = (
    employee,
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
    return axios.post(API_URL + "customers", {
        employee,
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

const get_customers = () => {
    return axios.get(API_URL + `customers`);
};

const get_specific_customers = (employee) => {
    return axios.get(API_URL + `customers/specific`  ,{
        params:{
            employee
        }
    });
};

const get_specific_customer = (id) => {
    return axios.get(API_URL + `customers/${id}`);
};

const get_specific_customer_info = (customer) => {
    return axios.get(API_URL + `customers/info`,{
        params:{customer}
    });
};


const update_specific_customer = (
    id,
    customer_representative,
    customer_representative_email,
    customer_representative_number,
    ) => {
    return axios.put(API_URL + `customers/${id}`, {
        customer_representative,
        customer_representative_email,
        customer_representative_number,
    });
};


export default{
    create_customer,
    get_specific_customer,
    update_specific_customer,
    get_specific_customer_info,
    get_customers,
    get_specific_customers,
};