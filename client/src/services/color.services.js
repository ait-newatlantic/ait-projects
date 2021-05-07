import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL
const API_URL = `${BASE_URL}/api/`

console.log(API_URL)

const get_colors = () => {
    return axios.get(API_URL + `colors`);
};

const ColorService = {
    get_colors,
}

export default ColorService;