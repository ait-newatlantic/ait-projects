import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = `${BASE_URL}/api/`;

console.log(API_URL);

const get_car_models = () => {
  return axios.get(API_URL + `car-models`);
};

const CarModelService = {
  get_car_models,
};

export default CarModelService;
