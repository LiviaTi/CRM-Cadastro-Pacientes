import axios from 'axios';

const api = axios.create({
    baseURL: 'https://crm-production-app-aa858b59d6e5.herokuapp.com'
});

export default api;