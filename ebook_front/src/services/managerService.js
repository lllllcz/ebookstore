import {postRequest, postRequest_v2} from "../utils/ajax";
import {history} from "../utils/history";
import {message} from "antd";

export const getBooks = (data, callback) => {
  const url = `http://localhost:8080/getBooks`;
  postRequest(url, data, callback);
};

export const setBook = (data, callback) => {
  const url = `http://localhost:8080/setBook`;

  postRequest_v2(url, data, callback);
};

export const deleteBook = (id, callback) => {
  const url = `http://localhost:8080/deleteBook`;
  const data = {id: id};
  postRequest_v2(url, data, callback);
}

export const addBook = (data, callback) => {
  const url = `http://localhost:8080/addBookToDB`;

  postRequest_v2(url, data, callback);
};

export const getAllUsers = (callback) => {
  const url = `http://localhost:8080/getAllUsers`;
  const data = {search: -1}
  postRequest(url, data, callback)
}

export const disableUser = (id, callback) => {
  const url = `http://localhost:8080/disableUser`;
  const data = {id: id};
  postRequest_v2(url, data, callback);
}

export const enableUser = (id, callback) => {
  const url = `http://localhost:8080/enableUser`;
  const data = {id: id};
  postRequest_v2(url, data, callback);
}


export const getAllOrders = (callback) => {
  const data = {search: -1};
  const url = `http://localhost:8080/getAllOrders`;
  postRequest_v2(url, data, callback);
}
