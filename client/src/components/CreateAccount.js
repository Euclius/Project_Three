import React, { Component } from 'react'
import axios from 'axios'
import {Redirect, Link} from 'react-router-dom'

export default class CreateAccount extends Component {
    state= {
        user: {
            userName: '',
            password: '',
        },
        createdUser: {}
    }
    createAccount = () => {
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
        this.createdAccount()
    }
  render() {
     if(this.state.redirectToHome === true) {
         return (<Redirect to= {`/users/${this.state.createdUser._id}`}></Redirect>)
     }
    return (
      <div>
          <Link to='/'>Return Home</Link>
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