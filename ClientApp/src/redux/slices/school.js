import { createSlice } from '@reduxjs/toolkit';

// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  schoolList: []
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

    // GET SCHOOL PROFILE
    getAllSchoolProfileSuccess(state, action) {
      state.isLoading = false;
      state.schoolList = action.payload;
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
