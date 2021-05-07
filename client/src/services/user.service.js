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
    return axios.get(USER_URL + `users/update`, {
        params: { id }
    });
};

const update_user = (
    id,
    name,
    email,
    password,
) => {
    return axios.put(USER_URL + `users/${id}`, {
        name,
        email,
        password,
    });
};

const get_user_by_branch = (branch_name) => {
    return axios.get(USER_URL + `users/branch`, {
        params: { branch_name }
    });
};

const get_user_by_branch_hide = (branch_name) => {
    return axios.get(USER_URL + `users/branch/hide`, {
        params: { branch_name }
    });
};

const hide_user = (
    id,
) => {
    return axios.put(USER_URL + `users/hide/${id}`);
};

const unhide_user = (
    id,
) => {
    return axios.put(USER_URL + `users/unhide/${id}`);
};

const UserService = {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
    getEmployeeBoard,
    get_users,
    get_users_specific,
    get_user_by_branch,
    delete_user,
    get_specific_user,
    update_user,
    hide_user,
    unhide_user,
    get_user_by_branch_hide,
}

export default UserService;