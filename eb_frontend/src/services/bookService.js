import {getRequest} from "../utils/ajax";

export const getBook = (id, callback) => {
  const url = `http://localhost:8080/getBook?bookId=`+id;
  getRequest(url, callback);
};

export const getAllBooks = (callback) => {
  const url = `http://localhost:8080/getAllBooks`;
  getRequest(url, callback);
};