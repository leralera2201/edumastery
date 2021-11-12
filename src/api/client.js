/* eslint no-restricted-syntax: "off", no-param-reassign: "off" */

import axios from 'axios';

// import { getItem } from 'storage';
import { API_URL } from 'constants';

const client = axios.create({
  baseURL: API_URL,
});

client.interceptors.request.use((config) => {
  // TODO: fix this
  // const token = getItem('X-AuthToken');

  // if (token) {
  //   config.headers['X-AuthToken'] = token;
  // }

  return config;
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response !== undefined) {
      if (error.response.status === 401 || error.response.status === 403) {
        // removeCookie('X-AuthToken');
      }
      const throwableError = {
        code: error.response.status,
        text: error.response.data.message,
      };

      throw throwableError;
    } else {
      throw error;
    }
  },
);

export default client;
