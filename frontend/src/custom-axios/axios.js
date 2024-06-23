import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8081/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

instance.interceptors.request.use(request => {
    console.log('Starting Request', request);
    return request;
});

instance.interceptors.response.use(response => {
    console.log('Response:', response);
    return response;
}, error => {
    console.log('Response error:', error);
    return Promise.reject(error);
});

export default instance;
