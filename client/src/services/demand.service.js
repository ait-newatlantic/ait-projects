import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL
const API_URL = `${BASE_URL}/api/`

console.log(API_URL)

const create_demand = (
    arr,
) => {
    return axios.post(API_URL + "demands", {
        arr,
    });
};

const update_demand = (
    id,
    demand_status_id,
    color_id,
    demand_date,
    demand_note,
) => {
    return axios.put(API_URL + `demands/${id}`, {
        demand_status_id,
        color_id,
        demand_date,
        demand_note,
    });
};

const hide_demand = (
    id,
) => {
    return axios.put(API_URL + `demands/hide/${id}`);
};

const unhide_demand = (
    id,
) => {
    return axios.put(API_URL + `demands/unhide/${id}`);
};

const get_demands = () => {
    return axios.get(API_URL + `demands`, {
    });
};

const get_specific_demand = (id) => {
    return axios.get(API_URL + `demands/update`, {
        params: { id }
    });
};

const get_demands_by_branch = (username, branch_name, demand_employee_name, province_name, customer_type_name, contact_type_name, demand_status_name, car_model_name, car_type_name, from_date, to_date) => {
    return axios.get(API_URL + `demands/branch`, {
        params: {username, branch_name, demand_employee_name, province_name, customer_type_name, contact_type_name, demand_status_name, car_model_name, car_type_name, from_date, to_date }
    });
};

const get_demands_by_branch_hide = (username, branch_name, demand_employee_name, province_name, customer_type_name, contact_type_name, demand_status_name, car_model_name, car_type_name, from_date, to_date) => {
    return axios.get(API_URL + `demands/branch/hide`, {
        params: {username, branch_name, demand_employee_name, province_name, customer_type_name, contact_type_name, demand_status_name, car_model_name, car_type_name, from_date, to_date }
    });
};

const get_demand_statuses = (username, branch_name, from_date, to_date) =>{
    return axios.get(API_URL + `demands/demandstatuses`, {
        params: {username, branch_name, from_date, to_date}
    });
};

const DemandService = {
    get_specific_demand,
    update_demand,
    create_demand,
    hide_demand,
    unhide_demand,
    get_demands,
    get_demands_by_branch,
    get_demands_by_branch_hide,
    get_demand_statuses,
}

export default DemandService;