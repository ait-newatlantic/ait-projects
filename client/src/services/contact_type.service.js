import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL
const API_URL = `${BASE_URL}/api/`

console.log(API_URL)

const get_contact_types = () => {
    return axios.get(API_URL + `contact-types`);
};

const ContactTypeService = {
    get_contact_types,
}

export default ContactTypeService;