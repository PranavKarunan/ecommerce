import { fetchWrapper } from "../helpers/fetchwrapper";

const url = process.env.REACT_APP_API_WMSINBOUND_URL;
export const zoneService = {
    getAllData
};

function getAllData() {
    return fetchWrapper.get(url);
}

