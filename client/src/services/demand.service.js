import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = `${BASE_URL}/api/`;

console.log(API_URL);

const create_demand = (arr) => {
  return axios.post(API_URL + "demands", {
    arr,
  });
};

const update_demand = (id, demand_status, date, note, color) => {
  return axios.put(API_URL + `demands/demand/${id}`, {
    demand_status,
    date,
    note,
    color,
  });
};

const hide_demand = (hide, id) => {
  return axios.put(API_URL + `demands/demand?hide=${hide}&id=${id}`);
};

const get_demands = () => {
  return axios.get(API_URL + `demands`, {});
};

const get_demand = (id) => {
  return axios.get(API_URL + `demands/demand/${id}`);
};

const get_demands_filtered = (
  branch_name,
  user_name,
  employee,
  province,
  customer,
  customer_number,
  customer_type,
  color,
  opinion,
  quantity,
  note,
  contact_type,
  demand_status,
  car_model,
  car_type,
  datetype,
  from_date,
  to_date,
  hide,
  order,
  limit
) => {
  return axios.get(API_URL + `demands/filters`, {
    params: {
      branch_name,
      user_name,
      employee,
      province,
      customer,
      customer_number,
      customer_type,
      color,
      opinion,
      quantity,
      note,
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

const get_demand_total = (branch_name, from_date, to_date) => {
  return axios.get(API_URL + `demands/demandstotal`, {
    params: { branch_name, from_date, to_date },
  });
};

const get_demand_quantity = (branch_name, from_date, to_date) => {
  return axios.get(API_URL + `demands/demandsquantity`, {
    params: { branch_name, from_date, to_date },
  });
};

const DemandService = {
  update_demand,
  create_demand,
  hide_demand,
  get_demands,
  get_demand,
  get_demands_filtered,
  get_demand_statuses,
  get_demand_total,
  get_demand_quantity,
};

export default DemandService;
