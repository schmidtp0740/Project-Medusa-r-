import axios from 'axios';
var token = require('basic-auth-token');

const url = 'http://localhost:8000/';


export async function checkLoginOCI(user, pass) {
  var login = url + "ocilogin";
  sessionStorage.setItem("lToken", "Basic " + token(user, pass));
  var auth = {
    headers: {
      "Authorization": sessionStorage.getItem("lToken")
    }
  }
  return axios
    .get(login, auth)
    .then(function (response) {
      console.log(response.data);
      localStorage.setItem("loginType", "O");
      return {0:response.data, 1:'O'};
    })
    .catch(function (error) {
      return false;
    });
}

export async function registerOCI(formData) {
  var link = url + "admin";
  return axios
    .post(link, formData,
    {headers: {
      'Content-Type': 'multipart/form-data'
    }})
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
    
}

export async function logout() {
  sessionStorage.removeItem("lToken");
}