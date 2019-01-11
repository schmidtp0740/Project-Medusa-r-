import axios from 'axios';
var token = require('basic-auth-token');

const url = 'http://localhost:8000/';
const lToken = sessionStorage.getItem("lToken");

export async function createUser(user, pass, email) {
  var link = url + "user";
  var auth = {
    headers: {
      "Authorization": sessionStorage.getItem("lToken")
    }
  }
  return axios.post(link, {
    username: user,
    password: pass,
    email: email
  }, auth)
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
}

export async function assignVM(userID, clientID) {
  var link = url + "user/" + userID;
  var auth = {
    headers: {
      "Authorization": sessionStorage.getItem("lToken")
    }
  }
  return axios.put(link, {
    client_id: clientID
  }, auth)
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
}

export async function getAllUsers() {
  var link = url + "user";
  var auth = {
    headers: {
      "Authorization": sessionStorage.getItem("lToken")
    }
  }
  return axios
    .get(link, auth)
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
}