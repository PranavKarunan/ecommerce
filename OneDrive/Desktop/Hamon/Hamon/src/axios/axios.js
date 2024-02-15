import axios from 'axios';
const url = process.env.REACT_APP_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json'
    }
});


axiosInstance.interceptors.request.use(
    (config) => {
        if (config.method === 'delete' && config.body) {
            // Convert the request body to a query parameter
            config.data = { ...config.body };
            delete config.body;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(

    (response) => response,
    (error) => {

        if (error.response?.data?.errors) {


            return Promise.reject((error.response.data.errors) || 'Something went wrong!');

        }
        else if (error.response?.data?.message) {

            if (!error.request.responseURL.toString().includes('tms'))

                return Promise.reject((error.response.data.message) || 'Something went wrong!');

        }
        else {

            return Promise.reject((error.response && error.response.data && error.response.data.message) || 'Something went wrong!');


        }


    }
);




export default axiosInstance;
