import axios from 'axios';

import { showErrorMessageModal } from '@/utils';

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

apiHelper.interceptors.response.use(
	(response) => response,
	(error) => {
		if (!error.response?.data?.message) {
			showErrorMessageModal({
				title: '未知錯誤',
				text: '發生未知錯誤，請稍後再試',
			});

			return;
		}

		return Promise.reject(error);
	},
);

export default apiHelper;
