import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom'
import User from './components/User.js'
import HomePage from './components/HomePage.js';
import Login from './components/Login.js'
import Activity from './components/Activity.js'
import CreateAccount from './components/CreateAccount.js';

class App extends Component {
  render() {
    return (
      <div>
<Router>
  <div>
    <Switch>
      <Route exact path ='/' component={HomePage}></Route>
      <Route path='/login' component={Login}></Route>
      <Route path='/activity' component={Activity}></Route>
      <Route path='/createAccount' component={CreateAccount}></Route>
    </Switch>
  </div>
</Router>
      </div>
     
    );
  }
}

export default App;
