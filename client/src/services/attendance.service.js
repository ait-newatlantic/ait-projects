import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = `${BASE_URL}/api/`;

const create_attendances = (arr) => {
    return axios.post(API_URL + "attendances", {
      arr,
    });
  };

const get_attendances = () => {
    return axios.get(API_URL + `attendances`);
};

const get_attendance_from_project = (id, from_date,
    to_date,) => {
    return axios.get(API_URL + `attendances/attendance/${id}`, {
        params: {
            from_date,
            to_date,
        },
    });
};

const AttendanceService = {
    get_attendances,
    get_attendance_from_project,
    create_attendances,
};

export default AttendanceService;
