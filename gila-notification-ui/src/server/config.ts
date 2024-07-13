import axios, { AxiosRequestConfig } from "axios";

const AUTH_TOKEN = "";
const BASE_URL = process.env.API_URL;

// const config: AxiosRequestConfig = {
//   withCredentials: true,
//   baseURL: BASE_URL,
//   headers: {
//     Accept: "*/*",
//     // Authorization: AUTH_TOKEN,
//     "Content-Type": "application/json",
//   },
//   transformRequest: [
//     (data) => {
//       return data;
//     },
//   ],
//   transformResponse: [
//     (data) => {
//       return data !== "" ? JSON.parse(data) : null;
//     },
//   ],
// };

const req = axios.create({});

// req.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

export default req;
