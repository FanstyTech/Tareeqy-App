import { createSlice } from '@reduxjs/toolkit';

// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  schoolList: [],
  schoolEmployeeList: [],
  schoolWorkingTimeList: [],
  schoolProfileData: {},
  licenseTypeForSelect: [],
  schoolStudentList: [],
  schoolStudentData: {}
};

const slice = createSlice({
  name: 'school',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    // School

    // GET SCHOOL PROFILES
    getAllSchoolProfileSuccess(state, action) {
      state.isLoading = false;
      state.schoolList = action.payload;
    },
    // GET SCHOOL PROFILE
    getSchoolProfileByIdSuccess(state, action) {
      state.isLoading = false;
      state.schoolProfileData = action.payload;
    },

    // SCHOOL EMPLOYEE
    getAllSchoolEmployeeSuccess(state, action) {
      state.isLoading = false;
      state.schoolEmployeeList = action.payload;
    },
    // SCHOOL WORKING TIME
    getSchoolWorkingTimeSuccess(state, action) {
      state.isLoading = false;
      state.schoolWorkingTimeList = action.payload;
    },

    // SCHOOL STUDENT
    getLicenseTypeForSelectSuccess(state, action) {
      state.isLoading = false;
      state.licenseTypeForSelect = action.payload;
    },
    getAllSchoolStudentSuccess(state, action) {
      state.isLoading = false;
      state.schoolStudentList = action.payload;
    },
    getSchoolStudentByIdSuccess(state, action) {
      state.isLoading = false;
      state.schoolStudentData = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { onToggleFollow, deleteUser } = slice.actions;

// ----------------------------------School Profile------------------------------------

export function getAllSchoolProfile() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('School/GetAllSchoolProfile');
      dispatch(slice.actions.getAllSchoolProfileSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getSchoolProfileById(Id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`School/GetSchoolProfileById?Id=${Id}`);
      dispatch(slice.actions.getSchoolProfileByIdSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function saveSchoolProfile(newEvent, file) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const formdata = new FormData();
      const objProps = Object.getOwnPropertyNames(newEvent);

      objProps.forEach((item) => {
        formdata.append(`${item}`, newEvent[item]);
      });

      if (file !== undefined) formdata.append('File', file);

      const response = await axios.post('School/SaveSchoolProfile', formdata, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const { code, data, message, status } = response.data;
      if (!status) {
        throw new Error(message);
      } else {
        dispatch(getSchoolProfileById(data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteSchoolProfileByIds(Ids) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('School/DeleteSchoolProfileByIds', Ids);
      const { code, data, message, status } = response.data;
      if (!status) {
        throw new Error(message);
      } else {
        dispatch(getAllSchoolProfile());
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------School Employee------------------------------------

export function getAllSchoolEmployee(Id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`School/GetAllSchoolEmployee?SchoolProfileId=${Id}`);
      dispatch(slice.actions.getAllSchoolEmployeeSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function saveSchoolEmployee(newEvent, file) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const formdata = new FormData();
      const objProps = Object.getOwnPropertyNames(newEvent);

      objProps.forEach((item) => {
        formdata.append(`${item}`, newEvent[item]);
      });

      if (file !== undefined) formdata.append('File', file);

      const response = await axios.post('School/SaveSchoolEmployee', formdata, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const { code, data, message, status } = response.data;
      if (!status) {
        throw new Error(message);
      } else {
        console.log('message', message);
        dispatch(getAllSchoolEmployee(newEvent?.SchoolProfileId));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deleteSchoolEmployeeeByIds(Ids, SchoolProfileId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('School/DeleteSchoolEmployeeeByIds', Ids);
      const { code, data, message, status } = response.data;
      if (!status) {
        throw new Error(message);
      } else {
        dispatch(getAllSchoolEmployee(SchoolProfileId));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
// ----------------------------------School Working Time------------------------------------

export function getSchoolWorkingTime(Id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`School/GetSchoolWorkingTime?SchoolProfileId=${Id}`);
      dispatch(slice.actions.getSchoolWorkingTimeSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function saveSchoolWorkingTime(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`School/SaveSchoolWorkingTime`, data);
      dispatch(slice.actions.getSchoolWorkingTimeSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
// ----------------------------------School Student------------------------------------
export function getLicenseTypeForSelect() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('School/GetLicenseTypeForSelect');
      dispatch(slice.actions.getLicenseTypeForSelectSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getSchoolStudentById(Id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`School/GetSchoolStudentById?Id=${Id}`);
      dispatch(slice.actions.getSchoolStudentByIdSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getAllSchoolStudent(Id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`School/GetAllSchoolStudent?SchoolProfileId=${Id}`);
      dispatch(slice.actions.getAllSchoolStudentSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function saveSchooStudent(newEvent, file) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const formdata = new FormData();
      const objProps = Object.getOwnPropertyNames(newEvent);

      objProps.forEach((item) => {
        formdata.append(`${item}`, newEvent[item]);
      });

      if (file !== undefined) formdata.append('File', file);

      const response = await axios.post('School/SaveSchooStudent', formdata, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const { code, data, message, status } = response.data;
      if (!status) {
        throw new Error(message);
      } else {
        dispatch(getSchoolStudentById(data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deleteSchoolStudentByIds(Ids, SchoolProfileId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('School/DeleteSchoolStudentByIds', Ids);
      const { code, data, message, status } = response.data;
      if (!status) {
        throw new Error(message);
      } else {
        console.log('message', message);
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
