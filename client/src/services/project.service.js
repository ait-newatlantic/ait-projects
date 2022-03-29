import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = `${BASE_URL}/api/`;

const get_projects = () => {
    return axios.get(API_URL + `projects`);
};

const ProjectService = {
    get_projects
};

export default ProjectService;
