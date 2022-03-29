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

const getDriverBoard = () => {
  return axios.get(API_URL + "driver", { headers: authHeader() });
};

const getTechinicianBoard = () => {
  return axios.get(API_URL + "technician", { headers: authHeader() });
};

const getAccountantBoard = () => {
  return axios.get(API_URL + "accountant", { headers: authHeader() });
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

const get_users_from_project = (id) => {
  return axios.get(USER_URL + `users/project/${id}`);
};

const get_users_attendace_from_project = (id) => {
  return axios.get(USER_URL + `users/project/attendance/${id}`);
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getAccountantBoard,
  getDriverBoard,
  getTechinicianBoard,
  getAdminBoard,
  get_users,
  delete_user,
  get_user,
  get_users_from_project,
  get_users_attendace_from_project
};

export default UserService;
