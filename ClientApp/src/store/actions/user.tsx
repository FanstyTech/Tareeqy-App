import { useHistory } from "react-router";
import { instance } from "../../axios_instance";
import { _doIFNotForbidden, getLanguage, openNotification } from "../../utils";

export const SUCCESS_LOGIN = "SUCCESS_LOGIN";
export const LOGIN = "LOGIN";
export const FAILED_LOGIN = "FAILED_LOGIN";

export const login = (obj: any) => (dispatch) => {
  dispatch({
    type: LOGIN,
  });
  instance
    .post("user/Login", obj)
    .then((res) => {
      const { code, data, message } = res.data;

      if (code != 200) {
        dispatch({
          type: FAILED_LOGIN,
          payload: message,
        });
      } else {
        // Save login data in local storage
        localStorage.setItem(
          "authData",
          JSON.stringify({
            user: data,
          })
        );

        dispatch({
          type: SUCCESS_LOGIN,
          payload: data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: FAILED_LOGIN,
      });
    });
};

export const LOGOUT = "LOGOUT";

export const logout = () => (dispatch) => {
  localStorage.removeItem("authData");
  dispatch({
    type: LOGOUT,
  });
};

export const CREATE_ACCOUNT_ASYNC = "CREATE_ACCOUNT_ASYNC";
export const SUCCESS_CREATE_ACCOUNT_ASYNC = "SUCCESS_CREATE_ACCOUNT_ASYNC";
export const FAILED_CREATE_ACCOUNT_ASYNC = "FAILED_CREATE_ACCOUNT_ASYNC";

export const CreateAccountAsync = (obj: any) => (dispatch) => {
  dispatch({
    type: CREATE_ACCOUNT_ASYNC,
  });
  instance
    .post("user/CreateAccount", obj)
    .then((res) => {
      const { code, data, message } = res.data;

      if (code != 200) {
        dispatch({
          type: FAILED_CREATE_ACCOUNT_ASYNC,
          payload: message,
        });
      } else {
        localStorage.setItem(
          "authData",
          JSON.stringify({
            user: data,
          })
        );

        dispatch({
          type: SUCCESS_CREATE_ACCOUNT_ASYNC,
          payload: data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: FAILED_CREATE_ACCOUNT_ASYNC,
        error: error?.data?.message || error,
      });
    });
};
