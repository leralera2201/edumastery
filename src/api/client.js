/* eslint no-restricted-syntax: "off", no-param-reassign: "off" */

import axios from 'axios';

import { getItem } from 'storage';
import { API_URL } from 'constants';

const client = axios.create({
  baseURL: API_URL,
});

client.interceptors.request.use(async (config) => {
  const token = await getItem('X-AuthToken');

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
});

export default client;
