import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  countriesList: []
};

const slice = createSlice({
  name: 'generalSetting',
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

    // GET PROFILE
    getCountriesListuccess(state, action) {
      state.isLoading = false;
      state.countriesList = action.payload;
    },
    // CREATE EVENT
    createCountryEvent(state, action) {
      const newEvent = action.payload;
      state.isLoading = false;
      state.events = [...state.events, newEvent];
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { onToggleFollow, deleteUser } = slice.actions;

// ----------------------------------------------------------------------

export function getCountriesList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('Country/GetAll');
      dispatch(slice.actions.getCountriesListuccess(response.data.data));
    } catch (error) {
      console.log(error);

      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createCountryEvent(newEvent) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const formdata = new FormData();
      formdata.append('Code', newEvent.Code);
      formdata.append('Currency', newEvent.Currency);
      formdata.append('IsActive', newEvent.IsActive);
      formdata.append('Name', newEvent.Name);
      formdata.append('File', newEvent?.avatarUrl);
      const response = await axios.post('Country/Save', formdata, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      //   console.log(response);

      dispatch(getCountriesList());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function attachmentDownload(ref) {
  console.log(ref);
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        PrimeryTableId: 16,
        AttatchmentTypeId: 1
      };
      const response = await axios.post('Attachment/AttachmentDownload', data);
      console.log(response);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
