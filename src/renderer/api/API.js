import axios from "axios";
import Keys from "../constants/appKeys";

let headers = {
  Accept: "application/json",
  "Content-Language": "UK",
  "Content-Type": "application/json",
};

if (localStorage.getItem(Keys.JWT_TOKEN))
  headers.Authorization = localStorage.getItem(Keys.JWT_TOKEN);

let API = axios.create({
  baseURL: Keys.REACT_APP_API_URL + "/",//'http://93.183.195.198:5002/',
  //timeout: process.env.REACT_APP_REQUESTS_TIMEOUTS || 30000,
  headers: headers,
});

API.interceptors.request.use((request) => requestHandler(request));

API.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

const errorHandler = (error) => {
  if (error.response && error.response.status === 401) {
    setTimeout(() => {
      forceLogout();
    }, 3000);
  }

  return Promise.reject(error);
};

const successHandler = (response) => {
  return response;
};

const requestHandler = (request) => {
  // console.log(request)
  return request;
};

export function forceLogout() {
  localStorage.clear();
  window.location = "/";
}

export default API;
