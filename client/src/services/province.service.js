import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = `${BASE_URL}/api/`;

console.log(API_URL);

const get_provinces = () => {
  return axios.get(API_URL + "provinces");
};

const get_province_by_name = (province_name) => {
  return axios.get(API_URL + `provinces/info`, {
    params: {
      province_name,
    },
  });
};

const ProvinceService = {
  get_provinces,
  get_province_by_name,
};

export default ProvinceService;
