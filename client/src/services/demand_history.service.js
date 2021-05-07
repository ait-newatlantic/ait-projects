import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL
const API_URL = `${BASE_URL}/api/`

console.log(API_URL)

const create_demand_history = (
    demand_date_2,
    user_id,
    demand_employee,
    car_model_id,
    car_type_id,
    demand_quantity,
    color_id_2,
    demand_status_id_2,
    customer_id,
    customer_type_id,
    demand_opinion,
    demand_meeting,
    contact_type_id,
    demand_note_2,
    demand_id,
) => {
    return axios.post(API_URL + "demand_histories", {
        demand_date_2,
        user_id,
        demand_employee,
        car_model_id,
        car_type_id,
        demand_quantity,
        color_id_2,
        demand_status_id_2,
        customer_id,
        customer_type_id,
        demand_opinion,
        demand_meeting,
        contact_type_id,
        demand_note_2,
        demand_id,
    });
};


const DemandHistoryService = {
    create_demand_history,
}

export default DemandHistoryService;