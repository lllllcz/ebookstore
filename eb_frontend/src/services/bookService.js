import {getRequest, postRequest} from "../utils/ajax";

export const getBook = (id, callback) => {
  const data = {bookId: id};
  const url = `http://localhost:8080/getBook`;
  postRequest(url, data, callback);
};

export const getAllBooks = (callback) => {
  const url = `http://localhost:8080/getAllBooks`;
  getRequest(url, callback);
};