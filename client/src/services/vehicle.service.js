import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = `${BASE_URL}/api/`;

const create_vehicle = (
    name,
    brand,
    code,
    registryDate,
    plateNumber,
    createdYear,
) => {
    return axios.post(API_URL + "vehicles", {
        name,
        brand,
        code,
        registryDate,
        plateNumber,
        createdYear,
    });
};

const update_vehicle = (id, projectId) => {
    return axios.put(API_URL + `vehicles`, {
        id,
        projectId
    });
};

const update_vehicle_status = (id, isWorking, description) => {
    return axios.put(API_URL + `vehicles/status`, {
        id,
        isWorking,
        description,
    });
};

const update_vehicle_description = (id, description) => {
    return axios.put(API_URL + `vehicles/description`, {
        id,
        description,
    });
};

const get_vehicles = () => {
    return axios.get(API_URL + `vehicles`);
};

const get_vehicle_from_project = (id) => {
    return axios.get(API_URL + `vehicles/project/${id}`);
};

const VehicleService = {
    create_vehicle,
    update_vehicle,
    update_vehicle_status,
    update_vehicle_description,
    get_vehicles,
    get_vehicle_from_project,
};

export default VehicleService;
