import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL

console.log(API_URL)

const create_demand = (date,
    employee,
    employee_field,
    model,
    type,
    quantity,
    status,
    customer,
    customer_number,
    customer_type,
    customer_area,
    customer_opinion,
    customer_meeting,
    customer_communication,
    color,
    note) => {
    return axios.post(API_URL + "api/demands", {
        date,
        employee,
        employee_field,
        model,
        type,
        quantity,
        status,
        customer,
        customer_number,
        customer_type,
        customer_area,
        customer_opinion,
        customer_meeting,
        customer_communication,
        color,
        note
    });
};

const get_specific_demand = (id) => {
    return axios.get(API_URL + `api/demands/:id`, {
        id
    });
};

export default {
    create_demand,
    get_specific_demand,
};