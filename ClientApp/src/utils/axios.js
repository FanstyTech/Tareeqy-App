import axios from 'axios';

// ----------------------------------------------------------------------
axios.defaults.baseURL = process.env.REACT_APP_LOCAL_BASE_URl;
const axiosInstance = axios.create();
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
