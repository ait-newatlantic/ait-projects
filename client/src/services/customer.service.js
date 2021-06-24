import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = `${BASE_URL}/api/`;

console.log(API_URL);

const create_customer = (
  customer_name,
  customer_number,
  customer_address,
  customer_manager,
  customer_manager_number,
  customer_manager_email,
  customer_taxcode,
  provinceId,
  userId,
  business_typeId
) => {
  return axios.post(API_URL + "customers", {
    customer_name,
    customer_number,
    customer_address,
    customer_manager,
    customer_manager_number,
    customer_manager_email,
    customer_taxcode,
    provinceId,
    userId,
    business_typeId,
  });
};

const get_customers = (username, branch_name, hide, order) => {
  return axios.get(API_URL + `customers`, {
    params: {
      username,
      branch_name,
      hide,
      order,
    },
  });
};

const get_customer = (id) => {
  return axios.get(API_URL + `customers/customer/${id}`);
};

const get_customers_filtered = (
  name,
  number,
  address,
  manager,
  manager_number,
  manager_email,
  taxcode,
  hide,
  username,
  user_name,
  province,
  business_type,
  datetype,
  from_date,
  to_date,
  branch_name,
  order,
  limit
) => {
  return axios.get(API_URL + `customers/filters`, {
    params: {
      name,
      number,
      address,
      manager,
      manager_number,
      manager_email,
      taxcode,
      hide,
      username,
      user_name,
      province,
      business_type,
      datetype,
      from_date,
      to_date,
      branch_name,
      order,
      limit,
    },
  });
};

const get_customer_by_name = (customer_name) => {
  return axios.get(API_URL + `customers/info`, {
    params: {
      customer_name,
    },
  });
};

const update_customer = (id, manager, manager_email, manager_number) => {
  return axios.put(API_URL + `customers/customer/${id}`, {
    manager,
    manager_email,
    manager_number,
  });
};

const hide_customer = (hide, id) => {
  return axios.put(API_URL + `customers/customer?hide=${hide}&id=${id}`);
};

const CustomerService = {
  create_customer,
  update_customer,
  get_customers_filtered,
  get_customers,
  hide_customer,
  get_customer,
  get_customer_by_name,
};

export default CustomerService;
