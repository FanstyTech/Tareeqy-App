import AxiosMockAdapter from 'axios-mock-adapter';
// utils
import axios from '../utils/axios';

/*
 * Toggle Mocking API on/off depending on boolean value of toggleState
 */

const axiosMockAdapter = new AxiosMockAdapter(axios, {
  delayResponse: 0
});

axios.defaults.adapter = axiosMockAdapter.originalAdapter;

// Removing mocking behavior
// axiosMockAdapter.restore();

export default axiosMockAdapter;
