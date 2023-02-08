import { createSlice } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack5';

// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  countriesList: [],
  currenciesSelectList: [],
  agreementForSelect: [],
  countryForSelect: [],
  cityForSelect: [],
  governorateForSelect: []
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

    // GET COUNTRIES
    getCountriesListSuccess(state, action) {
      state.isLoading = false;
      state.countriesList = action.payload;
    },

    // GET CURRENCIES
    getCurrenciesSelectListSuccess(state, action) {
      state.isLoading = false;
      state.currenciesSelectList = action.payload;
    },
    // GET AGREEMENT FOR SELECT

    getAgreementForSelectSuccess(state, action) {
      state.isLoading = false;
      state.agreementForSelect = action.payload;
    },
    // Location

    getCountryForSelectSuccess(state, action) {
      state.isLoading = false;
      state.countryForSelect = action.payload;
      state.cityForSelect = [];
      state.governorateForSelect = [];
    },
    getCityForSelectSuccess(state, action) {
      state.isLoading = false;
      state.cityForSelect = action.payload;
      state.governorateForSelect = [];
    },
    getGovernorateForSelectSuccess(state, action) {
      state.isLoading = false;
      state.governorateForSelect = action.payload;
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

// ----------------------------------Countries------------------------------------

export function getCountriesList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('Location/GetAllCountry');
      dispatch(slice.actions.getCountriesListSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function saveCountryEvent(newEvent) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const formdata = new FormData();
      formdata.append('Code', newEvent.Code);
      formdata.append('CurrencyId', newEvent.CurrencyId);
      formdata.append('IsActive', newEvent.IsActive);
      formdata.append('Name', newEvent.Name);
      if (newEvent.Id !== null) formdata.append('Id', newEvent.Id);
      if (newEvent?.avatarUrl !== undefined) formdata.append('File', newEvent?.avatarUrl);

      const response = await axios.post('Location/SaveCountry', formdata, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const { code, data, message, status } = response.data;
      console.log('message', message);
      // const { enqueueSnackbar } = useSnackbar();
      // enqueueSnackbar(message, { variant: 'success' });
      if (!status) {
        throw new Error(message);
      } else {
        // enqueueSnackbar('تمت العملية بنجاح', { variant: 'success' });

        dispatch(getCountriesList());
      }
    } catch (error) {
      console.log(error);
      // dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteCountry(Ids) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('Location/DeleteCountry', Ids);
      const { code, data, message, status } = response.data;
      if (!status) {
        throw new Error(message);
      } else {
        dispatch(getCountriesList());
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------Currencies------------------------------------
export function getCurrenciesSelectList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('Currency/GetForSelect');
      dispatch(slice.actions.getCurrenciesSelectListSuccess(response.data.data));
    } catch (error) {
      console.log(error);

      dispatch(slice.actions.hasError(error));
    }
  };
}

export function attachmentDownload(ref) {
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

// ----------------------------------Agreement------------------------------------
export function getAgreementForSelect() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('Agreement/GetAgreementForSelect');
      dispatch(slice.actions.getAgreementForSelectSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
// ----------------------------------Location------------------------------------
export function getCountryForSelect() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const filter = {
        MasterId: null
      };
      const response = await axios.post('Location/GetCountryForSelect', filter);
      dispatch(slice.actions.getCountryForSelectSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getCityForSelect(CountryId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const filter = {
        MasterId: CountryId
      };
      const response = await axios.post('Location/GetCityForSelect', filter);
      dispatch(slice.actions.getCityForSelectSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getGovernorateForSelect(CityId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const filter = {
        MasterId: CityId
      };
      const response = await axios.post('Location/GetGovernorateForSelect', filter);
      dispatch(slice.actions.getGovernorateForSelectSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
