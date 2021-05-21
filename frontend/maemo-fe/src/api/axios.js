import axios from 'axios';
import store from '../store/index';

const setHeader = () => {
  const AUTH_TOKEN = store.getState().user.token;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}` || null;
};

export const getAxios = (reqUrl, reqParams = {}) => {
  setHeader();
  return axios
    .create({
      baseURL: 'http://localhost:8000/',
      method: 'get',
      timeout: 10000,
      params: reqParams,
    })
    .request({ url: reqUrl });
};

export const postAxios = (reqUrl, reqData) => {
  setHeader();
  return axios
    .create({
      baseURL: 'http://localhost:8000/',
      method: 'post',
      timeout: 10000,
    })
    .request({ url: reqUrl, data: reqData });
};