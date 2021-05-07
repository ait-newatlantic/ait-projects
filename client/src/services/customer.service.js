import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL
const API_URL = `${BASE_URL}/api/`

console.log(API_URL)

const create_customer = (
    customer_name,
    customer_number,
    customer_address,
    customer_manager,
    customer_manager_number,
    customer_manager_email,
    customer_taxcode,
    provinceId,
    userId,
    business_typeId,
) => {
    return axios.post(API_URL + "customers", {
        customer_name,
        customer_number,
        customer_address,
        customer_manager,
        customer_manager_number,
        customer_manager_email,
        customer_taxcode,
        provinceId,
        userId,
        business_typeId,
    });
};

const get_customers = () => {
    return axios.get(API_URL + `customers`);
};

const get_specific_customer = (id) => {
    return axios.get(API_URL + `customers/update`, {
        params: { id }
    });
};

const get_customer_by_name = (customer_name) => {
    return axios.get(API_URL + `customers/name`, {
        params: { customer_name }
    });
};

const get_customer_by_branch = (username, branch_name, customer_name, province_name, business_type_name) => {
    return axios.get(API_URL + `customers/branch`, {
        params: {username, branch_name, customer_name, province_name, business_type_name }
    });
};

const get_customer_by_branch_hide = (username, branch_name, customer_name, province_name, business_type_name) => {
    return axios.get(API_URL + `customers/branch/hide`, {
        params: {username, branch_name, customer_name, province_name, business_type_name }
    });
};

const update_customer = (
    id,
    customer_manager,
    customer_manager_email,
    customer_manager_number,
) => {
    return axios.put(API_URL + `customers/${id}`, {
        customer_manager,
        customer_manager_email,
        customer_manager_number,
    });
};

const hide_customer = (
    id,
) => {
    return axios.put(API_URL + `customers/hide/${id}`);
};

const unhide_customer = (
    id,
) => {
    return axios.put(API_URL + `customers/unhide/${id}`);
};

const get_quantity = () => {
    return axios.get(API_URL + `customers/quantity`);
}

const CustomerService = {
    create_customer,
    get_specific_customer,
    update_customer,
    get_customer_by_name,
    get_customer_by_branch,
    get_customer_by_branch_hide,
    get_customers,
    unhide_customer,
    hide_customer,
    get_quantity,
}

export default CustomerService;