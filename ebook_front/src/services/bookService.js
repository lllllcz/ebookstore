import {postRequest, postRequest_v2} from "../utils/ajax";


export const getBooks = (data, callback) => {
  const url = `http://localhost:8080/getBooks`;
  postRequest(url, data, callback);
};

export const getBook = (id, callback) => {
  const data = {id: id};
  const url = `http://localhost:8080/getBook`;
  postRequest_v2(url, data, callback);

};

export const addBookToCart = (data, callback) => {
  const url = `http://localhost:8080/addBookToCart`;
  postRequest_v2(url, data, callback);
}

export const addOrder = (data, callback) => {
  const url = `http://localhost:8080/addOrder`;
  postRequest_v2(url, data, callback);
}

export const getCartBooks = (id, callback) => {
  const data = {userId: id};
  const url = `http://localhost:8080/getCartBooks`;
  console.log(data);
  postRequest_v2(url, data, callback);
}

export const removeCartBook = (data, callback) => {
  const url = `http://localhost:8080/removeCartBook`;
  postRequest_v2(url, data, callback);
}

export const getOrders = (id, callback) => {
  const data = {userId: id};
  const url = `http://localhost:8080/getOrders`;
  postRequest_v2(url, data, callback);
}
