const axios = require('axios');
require('dotenv').config();
const {BEARER_TOKEN, BASE_URL} = process.env


const twitterAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `BEARER ${BEARER_TOKEN}`
    }
  });



exports.twitterAxios = twitterAxios;