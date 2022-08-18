import {postRequest} from "../utils/ajax";
import {history} from '../utils/history';
import {message} from 'antd';



export const login = (data) => {
  const url = `http://localhost:8080/login`;
  const callback = (data) => {
    if(data.status >= 0) {
      message.success(data.msg);
      localStorage.setItem('user', JSON.stringify(data.data));
      history.push("/");
      window.location.reload();
    }
    else{
      message.error(data.msg);
    }
  };
  postRequest(url, data, callback);
};

export const logout = () => {
  const url = `http://localhost:8080/logout`;

  const callback = (data) => {
    if(data.status >= 0) {
      localStorage.removeItem("user");
      history.push("/login");
      message.success(data.msg);
    }
    else{
      message.error(data.msg);
    }
  };
  postRequest(url, {}, callback);
};

export const checkSession = (callback) => {
  const url = `http://localhost:8080/checkSession`;
  postRequest(url, {}, callback);
};

export const signup = (data) => {
  const url = `http://localhost:8080/signup`;
  const callback = (data) => {
    if(data.status >= 0) {
      message.success(data.msg);
      history.push("/login");
      window.location.reload();
    }
    else{
      message.error(data.msg);
    }
  };
  postRequest(url, data, callback);
}

