import axios from 'axios';

const BASE_URL = 'https://todolist-api.hexschool.io';

const apiHelper = axios.create({
	baseURL: BASE_URL,
});

apiHelper.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');

	if (token) {
		config.headers.Authorization = token;
	}

	return config;
});

export default apiHelper;
