import React, {Component} from 'react';
import {Route, Link, Switch} from "react-router-dom";
import AdminNav from './Components/Admin/AdminNav';
import Register from './Components/Initial/Register';
import Login from './Components/Initial/Login';
import AdminConsole from './Components/Admin/AdminConsole';
//import UserConsole from './Components/User/UserConsole';
//import UserNav from './Components/User/UserNav';
import UserManagement from './Components/Admin/UserManagement';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/Register" component={Register}/>
        <Route path="/Login" component={Login}/>
        <Route path="/AdminNav" component={AdminNav}/>
      </Switch>
    );
  }
}

export default App;