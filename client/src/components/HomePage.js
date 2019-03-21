import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Login from './Login.js'
import Activity from './Activity.js'

export default class HomePage extends Component {

  render() {
    return (
      <div>
        <h1>Activities around Atlanta</h1>
       <div> <Link to="/login" component={Login}>Login</Link></div>
     <div>  <Link to="/activity" component={Activity}>Activities</Link></div> 
     <h2>Bored in Atlanta? Want some ideas of what you can do on the cheap? Click the Activities link to gather some ideas</h2>
      </div>
    )
  }
}
