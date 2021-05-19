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
  return axios.delete(USER_URL + `/users/${id}`);
};

const get_user = (id) => {
  return axios.get(USER_URL + `users/${id}`);
};

const update_user = (id, name, email, password) => {
  return axios.put(USER_URL + `users/${id}`, {
    name,
    email,
    password,
  });
};

const get_user_by_branch = (hide, branch_name, username, email, name, role) => {
  return axios.get(USER_URL + `users/hide=${hide}`, {
    params: {
      branch_name,
      username,
      email,
      name,
      role,
    },
  });
};

const hide_user = (hide, id) => {
  return axios.put(USER_URL + `users/hide=${hide}/userId=${id}`);
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getEmployeeBoard,
  get_users,
  get_user_by_branch,
  delete_user,
  get_user,
  update_user,
  hide_user,
};

export default UserService;
