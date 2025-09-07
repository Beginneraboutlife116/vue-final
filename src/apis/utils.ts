import axios from 'axios';

const BASE_URL = 'https://todolist-api.hexschool.io';

const apiHelper = axios.create({
  baseURL: BASE_URL,
});

export default apiHelper;
