import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = `${BASE_URL}/api/`;

console.log(API_URL);

const create_demand = (arr) => {
    return axios.post(API_URL + "demands", {
        arr,
    });
};

const update_demand = (
    id,
    demand_status_id,
    color_id,
    demand_date,
    demand_note
) => {
    return axios.put(API_URL + `demands/${id}`, {
        demand_status_id,
        color_id,
        demand_date,
        demand_note,
    });
};

const hide_demand = (id) => {
    return axios.put(API_URL + `demands/hide/${id}`);
};

const get_demands = () => {
    return axios.get(API_URL + `demands`, {});
};

const get_specific_demand = (id) => {
    return axios.get(API_URL + `demands/update`, {
        params: { id },
    });
};

const get_demands_filtered = (
    branch,
    user_name,
    employee,
    province,
    customer,
    customer_number,
    customer_type,
    color,
    contact_type,
    demand_status,
    car_model,
    car_type,
    datetype,
    from_date,
    to_date,
    hide,
    order,
    limit,
) => {
    return axios.get(API_URL + `demands/filters`, {
        params: {
            branch,
            user_name,
            employee,
            province,
            customer,
            customer_number,
            customer_type,
            color,
            contact_type,
            demand_status,
            car_model,
            car_type,
            datetype,
            from_date,
            to_date,
            hide,
            order,
            limit,
        },
    });
};

const get_demand_statuses = (username, branch_name, from_date, to_date) => {
    return axios.get(API_URL + `demands/demandstatuses`, {
        params: { username, branch_name, from_date, to_date },
    });
};

const DemandService = {
    get_specific_demand,
    update_demand,
    create_demand,
    hide_demand,
    get_demands,
    get_demands_filtered,
    get_demand_statuses,
};

export default DemandService;