/* eslint no-restricted-syntax: "off", no-param-reassign: "off" */

import axios from 'axios';

import { API_EMAIL_URL } from 'constants';

const emailClient = axios.create({
  baseURL: API_EMAIL_URL,
});

export default emailClient;
