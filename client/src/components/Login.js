import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


export default class Login extends Component {
    state={
        users: []
    }
    componentDidMount = () => {
        this.showAllUsers()
    }
    showAllUsers = () => {
        axios.get('/api/users').then(res => {
            this.setState({users: res.data})
        })
    }
  render() {
    return (
      <div>
          <h1>Pick which username you are</h1>
         <div> {this.state.users.map((user) => {
              return (<Link to={`/users/${user._id}`} 
              key={user._id}>{user.userName}</Link>)
          })}</div>
          
        <div><Link to='/createAccount'>Create an account</Link></div>
        <div><Link to='/'> Return Home</Link></div>
      </div>
    )
  }
}
