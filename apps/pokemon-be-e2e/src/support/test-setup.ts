/* eslint-disable */

import axios from 'axios';

module.exports = async function () {
  // Configure axios for tests to use.
  const host = 'localhost';
  const port = process.env.FE_PORT ?? '3000';
  axios.defaults.baseURL = `http://${host}:${port}`;
};
