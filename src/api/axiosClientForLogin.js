// api/axiosClient.js
import axios from "axios";
import queryString from "query-string";
// import jwt_decode from 'jwt-decode'
// import { useSelector } from 'react-redux'
// const user = useSelector((state) => state.auth.login?.currentUser)
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

const refreshHandle = axios.create();
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};
axiosClient.interceptors.response.use(
  (resp) => {
    if (resp && resp.data) {
      return resp.data;
    }
    return resp;
  },
  async (error) => {
    const originalRequest = error.config;

    // eslint-disable-next-line no-underscore-dangle
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosClient(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      // eslint-disable-next-line no-underscore-dangle
      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        refreshHandle
          .post(
            `${process.env.REACT_APP_API_URL}/auth/refresh`,
            {},
            { withCredentials: true }
          )
          .then(({ data }) => {
            processQueue(null, data);
            resolve(axiosClient(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosClientForLogin;
