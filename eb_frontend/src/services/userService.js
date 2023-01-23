import {getRequest, postRequest} from "../utils/ajax";

export const login = (data, callback) => {
  const url = `http://localhost:8080/login`;
  postRequest(url, data, callback);
};

export const checkSession = (callback) => {
  const url = `http://localhost:8080/checkSession/`;
  getRequest(url, callback);
};

export const logout = (callback) => {
  const url = `http://localhost:8080/logout`;
  getRequest(url, callback);
};
