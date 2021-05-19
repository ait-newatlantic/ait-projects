import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = `${BASE_URL}/api/`;

console.log(API_URL);

const get_branchs = () => {
  return axios.get(API_URL + `branches`);
};

const get_branch_by_name = (branch_name) => {
  return axios.get(API_URL + `branches/name`, {
    params: { branch_name },
  });
};

const BranchService = {
  get_branchs,
  get_branch_by_name,
};

export default BranchService;
