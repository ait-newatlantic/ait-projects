import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = `${BASE_URL}/api/`;

console.log(API_URL);

const create_demand_history = (
  arr,
) => {
  return axios.post(API_URL + "demand_histories", {
    arr,
  });
};

const DemandHistoryService = {
  create_demand_history,
};

export default DemandHistoryService;
