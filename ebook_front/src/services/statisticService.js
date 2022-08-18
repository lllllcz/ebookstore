import {postRequest} from "../utils/ajax";

export const getBookSales = (data, callback) => {
  const url = `http://localhost:8080/getBookSales`;
  postRequest(url, data, callback);
};

export const getUserSales = (data, callback) => {
  const url = `http://localhost:8080/getUserSales`;
  postRequest(url, data, callback);
};

export const getUserStat = (data, callback) => {
  const url = `http://localhost:8080/getUserStat`;
  postRequest(url, data, callback);
};


