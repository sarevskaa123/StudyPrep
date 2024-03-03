import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8081/api',
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers' : 'Origin, Content-Type, X-Auth-Token',
        'Authorization': localStorage.getItem("JWT")
    }
})

instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem("JWT");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => {
        if (error.response.status === 403) {
            localStorage.removeItem("JWT");
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);


export default instance;