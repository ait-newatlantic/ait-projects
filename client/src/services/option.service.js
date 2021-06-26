import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = `${BASE_URL}/api/`;

console.log(API_URL);

const get_options = () => {
  return axios.get(API_URL + `options`);
};

const OptionService = {
  get_options,
};

export default OptionService;
