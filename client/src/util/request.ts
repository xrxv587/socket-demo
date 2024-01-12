import axios from "axios";
const request = axios.create({
	timeout: 5000,
	baseURL: "/api"
});
request.interceptors.response.use((response) => response.data, (error) => Promise.reject(error));

export default request;