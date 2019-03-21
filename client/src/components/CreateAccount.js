import React, { Component } from 'react'
import axios from 'axios';

export default class CreateAccount extends Component {
    state= {
        user: {
            userName: '',
            password: '',
        },
        createdUser: {}
    }
    createUser = () => {
        axios.post('/api/users', {
            user: this.state.user
        }).then((res)=>{
            this.setState({createdUser: res.data})
        })
    }
    handleChange = (e) => {
        const newUser = {...this.state.user}
        newUser[e.target.name] = e.target.value
        this.setState({user: newUser})
    }
    handleSignUp = (e) => {
        e.prevent.Default()
        this.createdUser()
    }
  render() {
    return (
      <div>
          <form onSubmit={this.handleSignUp}>
          <div>
        <label htmlFor="userName">Username: </label>
        <input onChange={this.handleChange}
        name="userName"
        type="text"
        value={this.state.user.userName}></input>
        </div>
        <div>
           <label htmlFor="password">Password: </label>
           <input onChange={this.handleChange}
           name="password"
           type="password"
           value={this.state.user.password}></input>
        </div>
       <button>Sign Up!</button>
       </form>
      </div>
    )
  }
}
