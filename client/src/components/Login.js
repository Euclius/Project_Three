import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import HomePage from './HomePage.js'
import axios from 'axios'
import CreateAccount from './CreateAccount.js';

export default class Login extends Component {
    state={
        users: []
    }
    componentDidMount = () => {
        this.getAllUsers()
    }
    getAllUsers = () => {
        axios.get('/api/users').then(res => {
            console.log(res)
        })
    }
  render() {
    return (
      <div>
          <h1>Pick which username you are</h1>
        <div><Link to='/createAccount'>Create an account</Link></div>
        <div><Link to='/'> Return Home</Link></div>
      </div>
    )
  }
}
