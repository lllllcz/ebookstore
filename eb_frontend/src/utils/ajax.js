let postRequest = (url, data, callback) => {
  let formData = new FormData();

  for (let p in data){
    if(data.hasOwnProperty(p))
      formData.append(p, data[p]);
  }

  let opts = {
    method: "POST",
    body: formData,
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