import axios from 'axios';

// ----------------------------------------------------------------------
axios.defaults.baseURL = 'https://github.com/prettier/eslint-plugin-prettier/issues/219';
const axiosInstance = axios.create();
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
