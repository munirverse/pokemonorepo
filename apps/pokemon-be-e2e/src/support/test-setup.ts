/* eslint-disable */

import axios from 'axios';

module.exports = async function () {
  // Configure axios for tests to use.
  axios.defaults.baseURL =
    process.env['BE_LOCAL_URL'] ?? 'http://localhost:5300';
};
