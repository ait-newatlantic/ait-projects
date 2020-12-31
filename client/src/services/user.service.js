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

const getEmployeeBoard = () => {
    return axios.get(API_URL + "employee", { headers: authHeader() });
};

const getAdminBoard = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
};

const get_users = () => {
    return axios.get(USER_URL + `users`);
};

const get_users_specific = (employee) => {
    return axios.get(USER_URL + `users/specific`, {
        employee,
    });
};

const delete_user = (id) => {
    return axios.delete(USER_URL + `/users/${id}`);
}

const get_specific_user = (id) => {
    return axios.get(USER_URL + `users/${id}`);
};

const update_specific_user = (
    id,
    password,
    ) => {
    return axios.put(USER_URL + `users/${id}`, {
        password,
    });
};

export default {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
    get_users,
    get_users_specific,
    delete_user,
    get_specific_user,
    update_specific_user,
};