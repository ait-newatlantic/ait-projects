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
    return axios.post(API_URL + "demands", {
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

const update_specific_demand = (
    id,
    ait,
    kmt,
    date,
    note,
    status,
    color,) => {
    return axios.put(API_URL + `demands/${id}`, {
        ait,
        kmt,
        date,
        note,
        status,
        color,
    });
};

const get_demands = () => {
    return axios.get(API_URL + `demands`);
};

const get_specific_demand = (id) => {
    return axios.get(API_URL + `demands/${id}`);
};

const get_overall = (fromdate, todate) => {
    return axios.get(API_URL + `demands/overall` ,{
        params:{
            fromdate,
            todate,
        }
    });
};

const get_total = (fromdate, todate) => {
    return axios.get(API_URL + `demands/total` ,{
        params:{
            fromdate,
            todate,
        }
    });
};

const get_date = (fromdate, todate) => {
    return axios.get(API_URL + `demands/date` ,{
        params:{
            fromdate,
            todate,
        }
    });
};

const get_createAt = (fromdate, todate) => {
    return axios.get(API_URL + `demands/createat` ,{
        params:{
            fromdate,
            todate,
        }
    });
};

const get_updateAt = (fromdate, todate) => {
    return axios.get(API_URL + `demands/updateat` ,{
        params:{
            fromdate,
            todate,
        }
    });
};

const get_goAt = (fromdate, todate) => {
    return axios.get(API_URL + `demands/goat` ,{
        params:{
            fromdate,
            todate,
        }
    });
};

export default {
    get_demands,
    create_demand,
    get_specific_demand,
    update_specific_demand,
    get_overall,
    get_total,
    get_date,
    get_createAt,
    get_updateAt,
    get_goAt,
};