import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL
const API_URL = `${BASE_URL}/api/`

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
    arr,
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
        arr,
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

const get_all_models = (employee, fromdate, todate) => {
    return axios.get(API_URL + `demands/allmodels`, {
        params:{
            employee,
            fromdate,
            todate,
        }
    });
};

const get_all_quantity = (employee, fromdate, todate) => {
    return axios.get(API_URL + `demands/allquantity`, {
        params:{
            employee,
            fromdate,
            todate,
        }
    });
};

const get_demands = (employee) => {
    return axios.get(API_URL + `demands` ,{
        params:{
            employee
        }
    });
};

const get_specific_demand = (id) => {
    return axios.get(API_URL + `demands/${id}`);
};

const get_overall = (employee, fromdate, todate) => {
    return axios.get(API_URL + `demands/overall` ,{
        params:{
            employee,
            fromdate,
            todate,
        }
    });
};

const get_total = (employee, fromdate, todate) => {
    return axios.get(API_URL + `demands/total` ,{
        params:{
            employee,
            fromdate,
            todate,
        }
    });
};

const get_date = (employee, fromdate, todate) => {
    return axios.get(API_URL + `demands/date` ,{
        params:{
            employee,
            fromdate,
            todate,
        }
    });
};

const get_createAt = ( employee, fromdate, todate) => {
    return axios.get(API_URL + `demands/createat` ,{
        params:{
            employee,
            fromdate,
            todate,
        }
    });
};

const get_updateAt = ( employee, fromdate, todate) => {
    return axios.get(API_URL + `demands/updateat` ,{
        params:{
            employee,
            fromdate,
            todate,
        }
    });
};

const get_goAt = ( employee, fromdate, todate) => {
    return axios.get(API_URL + `demands/goat` ,{
        params:{
            employee,
            fromdate,
            todate,
        }
    });
};

export default {
    get_specific_demand,
    update_specific_demand,
    create_demand,
    get_demands,
    get_overall,
    get_total,
    get_date,
    get_createAt,
    get_updateAt,
    get_goAt,
    get_all_models,
    get_all_quantity,
};