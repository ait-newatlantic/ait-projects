import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL
const API_URL = `${BASE_URL}/api/`

console.log(API_URL)

const get_demand_statuses = () => {
    return axios.get(API_URL + `demand-statuses`);
};

const DemandStatusService = {
    get_demand_statuses,
}

export default DemandStatusService;