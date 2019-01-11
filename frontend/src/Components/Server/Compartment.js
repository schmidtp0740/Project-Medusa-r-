import axios from 'axios';
var token = require('basic-auth-token');

const url = 'http://localhost:8000/';
const lToken = sessionStorage.getItem("lToken");

  
export async function getCompartments() {
  if (lToken) {
    var compartments = url + "compartments";
    var auth = {
      headers: {
        "Authorization": lToken
      }
    }
    return axios
      .get(compartments, auth)
      .then(function (response) {
        return response.data.compartments;
      })
      .catch(function (error) {
        console.log(error);
        return "Something went wrong.";
      });
  } else 
    return "logout";
}
  
export async function getInstances(ocid) {
  if (lToken) {
    var compartments = url + "instances" + "/" + ocid;
    var auth = {
      headers: {
        "Authorization": lToken
      }
    }
    return axios
      .get(compartments, auth)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return "Something went wrong.";
      });
  } else 
    return "logout";
}
  
export async function setRDPCredentials(user, pass) {
  if (lToken) {
    var vdi = url + "admin";
    var auth = {
      headers: {
        "Authorization": lToken
      }
    }
    return axios.put(vdi, {
      username: user,
      password: pass
    }, auth)
      .then(function (response) {
        console.log(response);
        return response.statusText;
      })
      .catch(function (error) {
        console.log(error);
        return 'false';
      });
  } else 
    return "logout";
}
  
export async function setConsoleKey(data) {
  if (lToken) {
    var vdi = url + "instances";
    var auth = {
      headers: {
        "Authorization": lToken,
        'Content-Type': 'multipart/form-data'
      }
    }
    return axios.post(vdi, data, auth)
      .then(function (response) {
        console.log(response);
        return response.statusText;
      })
      .catch(function (error) {
        console.log(error);
        return 'false';
      });
  } else 
    return "logout";
  }