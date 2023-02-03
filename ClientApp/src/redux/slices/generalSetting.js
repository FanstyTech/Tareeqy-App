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
      const response = await axios.get('/api/user/manage-users');
      console.log(response);
      dispatch(slice.actions.getCountriesListuccess(response.data.users));
    } catch (error) {
      console.log(error);

      dispatch(slice.actions.hasError(error));
    }
  };
}
