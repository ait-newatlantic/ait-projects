import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = `${BASE_URL}/api/`;

const create_export_oil_report = (
    exportDate,
    exportPaper,
    amountBefore,
    amountAfter,
    quantity,
    trips,
    discount,
    consumption,
    price,
    oilTypeId,
    unitId,
    note,
    projectId,
    userId
) => {
    return axios.post(API_URL + "oil_export_report", {
        exportDate,
        exportPaper,
        amountBefore,
        amountAfter,
        quantity,
        trips,
        discount,
        consumption,
        price,
        oilTypeId,
        unitId,
        note,
        projectId,
        userId
    });
};

const get_export_oil = () => {
    return axios.get(API_URL + `oil_export_report`);
};

const get_export_oil_from_project = (id, from_date, to_date) => {
    return axios.get(API_URL + `oil_export_report/${id}`, {
        params: {
            from_date,
            to_date,
        },
    });
};

const ExportOilService = {
    create_export_oil_report,
    get_export_oil,
    get_export_oil_from_project
};

export default ExportOilService;
