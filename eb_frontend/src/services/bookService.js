import {getRequest} from "../utils/ajax";
import {backendURL} from "../assets/backendURL";

export const getBook = (id, callback) => {
  const url = backendURL + `/getBook?bookId=`+id;
  getRequest(url, callback);
};

export const getAllBooks = (callback) => {
  const url = backendURL + `/getAllBooks`;
  getRequest(url, callback);
};