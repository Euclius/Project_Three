import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import UsernamePage from './components/UsernamePage.js'
import HomePage from './components/HomePage.js';
import Login from './components/Login.js'
import Activity from './components/Activity.js'
import CreateAccount from './components/CreateAccount.js';
import CreateActivity from './components/CreateActivity.js';
import ActivityShow from './components/ActivityShow.js'
import EditUser from './components/EditUser.js';

class App extends Component {
  render() {
    return (
      <div>
<Router>
  <div>
    <Switch>
      <Route exact path ='/' component={HomePage}></Route>
      <Route path='/login' component={Login}></Route>
      <Route exact path='/users/:userId/activities' component={Activity}></Route>
      <Route path='/createAccount' component={CreateAccount}></Route>
      <Route exact path='/users/:userId' component={UsernamePage}></Route>
      <Route path='/:userId/createActivity' component={CreateActivity}></Route>
      <Route path='/:userId/:/activityId/activityShow' component={ActivityShow}></Route>
      <Route path='/:userId/edit' component={EditUser}></Route>
    </Switch>
  </div>
</Router>
      </div>
     
    );
  }
}

export default App;
