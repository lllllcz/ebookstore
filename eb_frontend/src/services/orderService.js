import {getRequest, postRequest} from "../utils/ajax";
import {backendURL} from "../assets/backendURL";

export const setBookToCart = (userId, bookId, callback) => {
  const url = backendURL + `/setBookToCart`;
  const data = {userId:userId, bookId:bookId};
  postRequest(url, data, callback);
};

export const setOrder = (userId, callback) => {
  const url = backendURL + `/setOrder`;
  const data = {userId:userId};
  postRequest(url, data, callback);
};

export const setBookToOrder = (userId, bookId, num, callback) => {
  const url = backendURL + `/setBookToOrder`;
  const data = {userId:userId, bookId:bookId, bookNum:num};
  postRequest(url, data, callback);
};

export const  getUserCart = (userId, callback) => {
  const url = backendURL + `/getUserCart?userId=` + userId;
  getRequest(url, callback);
}

export const  getUserOrders = (userId, callback) => {
  const url = backendURL + `/getUserOrders?userId=` + userId;
  getRequest(url, callback);
}

export const removeBookFromCart = (userId, bookId, callback) => {
  const url = backendURL + `/removeBookFromCart`;
  const data = {userId:userId, bookId:bookId};
  postRequest(url, data, callback);
};