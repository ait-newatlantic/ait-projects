import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = `${BASE_URL}/api/`;

const create_report = (
    damageDate,
    damageContent,
    vehicleId,
    projectId,
    userId
) => {
    return axios.post(API_URL + "reports", {
        damageDate,
        damageContent,
        vehicleId,
        projectId,
        userId
    });
};

const update_report = (fixDate, fixContent, sparePartCode, sparePartName, quantity, fixCrew, price, note, unitId, reportId) => {
    return axios.put(API_URL + `reports`, {
        fixDate,
        fixContent,
        sparePartCode,
        sparePartName,
        quantity,
        fixCrew,
        price,
        note,
        unitId,
        reportId,
    });
};

const get_reports = () => {
    return axios.get(API_URL + `reports`);
};

const get_reports_from_id = (id, from_date, to_date) => {
    return axios.get(API_URL + `reports/${id}`, {
        params: {
            from_date,
            to_date,
        },
    });
};

const get_report_from_project = (projectId, id, from_date,
    to_date,) => {
    return axios.get(API_URL + `reports/report/${projectId}/${id}`, {
        params: {
            from_date,
            to_date,
        },
    });
};

const ReportService = {
    create_report,
    get_reports_from_id,
    update_report,
    get_reports,
    get_report_from_project,
};

export default ReportService;
