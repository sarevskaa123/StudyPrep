// import axios from "axios";
//
// const instance = axios.create({
//     baseURL: 'http://localhost:8081/api',
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': localStorage.getItem("JWT")
//     }
// });
//
// instance.interceptors.request.use(
//     config => {
//         const token = localStorage.getItem("JWT");
//         if (token) config.headers.Authorization = `Bearer ${token}`;
//         return config;
//     },
//     error => {
//         if (error.response && error.response.status === 403) {
//             localStorage.removeItem("JWT");
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// );
//
// export default instance;
// src/custom-axios/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8081/api',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("JWT") ? `Bearer ${localStorage.getItem("JWT")}` : undefined,
    }
});

export default instance;
