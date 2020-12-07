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

const get_demands_specific = (employee) => {
    return axios.get(API_URL + `demands/specific` ,{
        params:{
            employee
        }
    });
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

const get_overall_specific = (employee, fromdate, todate) => {
    return axios.get(API_URL + `demands/overall/specific` ,{
        params:{
            employee,
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

const get_total_specific = (employee, fromdate, todate) => {
    return axios.get(API_URL + `demands/total/specific` ,{
        params:{
            employee,
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

const get_date_specific = (employee, fromdate, todate) => {
    return axios.get(API_URL + `demands/date/specific` ,{
        params:{
            employee,
            fromdate,
            todate,
        }
    });
};

const get_createAt_specific = ( employee, fromdate, todate) => {
    return axios.get(API_URL + `demands/createat/specific` ,{
        params:{
            employee,
            fromdate,
            todate,
        }
    });
};

const get_updateAt_specific = ( employee, fromdate, todate) => {
    return axios.get(API_URL + `demands/updateat/specific` ,{
        params:{
            employee,
            fromdate,
            todate,
        }
    });
};

const get_goAt_specific = ( employee, fromdate, todate) => {
    return axios.get(API_URL + `demands/goat/specific` ,{
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
    get_demands_specific,
    get_overall_specific,
    get_total_specific,
    get_date_specific,
    get_createAt_specific,
    get_updateAt_specific,
    get_goAt_specific,
};