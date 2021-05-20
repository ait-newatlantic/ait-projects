import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = `${BASE_URL}/api/test/`;
const USER_URL = `${BASE_URL}/api/`;

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

const delete_user = (id) => {
    return axios.delete(USER_URL + `/users/user/${id}`);
};

const get_user = (id) => {
    return axios.get(USER_URL + `users/user/${id}`);
};

const get_users_filtered = (hide, branch_name, username, email, name, role) => {
    return axios.get(USER_URL + `users/filters`, {
        params: {
            hide,
            branch_name,
            username,
            email,
            name,
            role,
        },
    });
};

const update_user = (id, name, email, password) => {
    return axios.put(USER_URL + `users/user/${id}`, {
        name,
        email,
        password,
    });
};

const hide_user = (hide, id) => {
    return axios.put(USER_URL + `users/user?hide=${hide}&id=${id}`);
};

const UserService = {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
    getEmployeeBoard,
    get_users,
    get_users_filtered,
    delete_user,
    get_user,
    update_user,
    hide_user,
};

export default UserService;