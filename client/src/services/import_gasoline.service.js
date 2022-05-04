import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = `${BASE_URL}/api/`;

const create_import_oil_report = (
    importDate,
    importPaper,
    code,
    quantity,
    price,
    supplier,
    note,
    oilTypeId,
    unitId,
    projectId,
    userId
) => {
    return axios.post(API_URL + "oil_import_report", {
        importDate,
        importPaper,
        code,
        quantity,
        price,
        supplier,
        note,
        oilTypeId,
        unitId,
        projectId,
        userId
    });
};

const get_import_oil = () => {
    return axios.get(API_URL + `oil_import_report`);
};

const get_import_oil_from_project = (id, from_date, to_date) => {
    return axios.get(API_URL + `oil_import_report/${id}`, {
        params: {
            from_date,
            to_date,
        },
    });
};

const ImportOilService = {
    create_import_oil_report,
    get_import_oil,
    get_import_oil_from_project
};

export default ImportOilService;
