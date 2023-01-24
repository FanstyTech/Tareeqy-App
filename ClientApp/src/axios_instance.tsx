import axios from "axios";
import { openNotification } from "./utils";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const { token } = JSON.parse(localStorage.getItem("authData")) || {
      authToken: "",
    };
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    config.headers["Content-Type"] = "application/json";
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["ModuleId"] = "30";
    config.headers["ENTRY_SOURCE_ID"] = "1";

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status == 401) {
      localStorage.clear();
      window.location.pathname = "/logout";
    }
    if (error.response.status == 403) {
    }
    return Promise.reject(error);
  }
);
export { instance };
