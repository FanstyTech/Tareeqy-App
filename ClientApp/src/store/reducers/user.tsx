import * as actionTypes from "../actions/user";

const authData = JSON.parse(localStorage.getItem("authData"));

const initialState = {
  loading: false,
  load_lang: false,
  success_email: undefined,
  isLoginNow: false,
  ...authData,
  changpassword: {},
  error: {},
} || {
  user: undefined,
  success_email: undefined,
  token: undefined,
  loading: false,
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.CREATE_ACCOUNT_ASYNC:
    case actionTypes.LOGIN: {
      return {
        ...state,
        loading: true,
        error: "",
        success_email: "",
      };
    }
    case actionTypes.SUCCESS_CREATE_ACCOUNT_ASYNC:
    case actionTypes.SUCCESS_LOGIN: {
      return {
        ...state,
        user: action.payload,
        isLoginNow: true,
        loading: false,
      };
    }

    case actionTypes.LOGOUT: {
      return {
        ...state,
        token: undefined,
        user: undefined,
        loading: false,
        isLoginNow: false,
        error: "",
      };
    }

    case actionTypes.FAILED_CREATE_ACCOUNT_ASYNC:
    case actionTypes.FAILED_LOGIN: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
