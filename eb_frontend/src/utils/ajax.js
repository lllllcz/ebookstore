let postRequest = (url, data, callback) => {

  let opts = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "include"
  };

  fetch(url,opts)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

let getRequest = (url, callback) => {

  let opts = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "include"
  };

  fetch(url,opts)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export {postRequest, getRequest};