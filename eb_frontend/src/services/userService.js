import {getRequest, postRequest} from "../utils/ajax";
import {backendURL} from "../assets/backendURL";

export function signup(value, callback) {
  const url = backendURL + `/signup`;
  postRequest(url, value, callback);
}

export const login = (data, callback) => {
  const url = backendURL + `/login`;
  postRequest(url, data, callback);
};

export const checkSession = (callback) => {
  const url = backendURL + `/checkSession/`;
  getRequest(url, callback);
};

export const logout = (callback) => {
  const url = backendURL + `/logout`;
  getRequest(url, callback);
};

export const hello = (userId, callback) => {
  const url = backendURL + `/hello?userId=` + userId;
  getRequest(url, callback);
}
