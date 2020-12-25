import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = process.env.REACT_APP_BASE_URL
const API_URL = `${BASE_URL}/api/test/`
const USER_URL = `${BASE_URL}/api/`

const getPublicContent = () => {
    return axios.get(API_URL + "all");
};

const getUserBoard = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
    return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
};

const get_users = () => {
    return axios.get(USER_URL + `users`);
};

const delete_user = (id) => {
    return axios.delete(USER_URL + `/users/${id}`);
}

const get_specific_user = (id) => {
    return axios.get(API_URL + `users/${id}`);
};

export default {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
    get_users,
    delete_user,
    get_specific_user,
};