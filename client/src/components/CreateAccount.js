import React, { Component } from 'react'
import axios from 'axios'
import {Redirect, Link} from 'react-router-dom'
import styled from 'styled-components'

// const StyledView = styled.View`
// background-color: papayawhip;
// `

export default class CreateAccount extends Component {
    state= {
        users: [],
        user: {
            userName: '',
            password: '',
        },
        createdUser: {},
        redirectToHome: false,
    }

    createAccount = () => {
        axios.post('/api/users', {
            user: this.state.user
        }).then((res)=>{
            const usersList = [...this.state.users]
            usersList.unshift(res.data)
            this.setState({createdUser: res.data, redirectToHome: true})
        })
    }
    handleChange = (e) => {
        const newUser = {...this.state.user}
        newUser[e.target.name] = e.target.value
        this.setState({user: newUser})

    }
    handleSignUp = (e) => {
        e.preventDefault()
        this.createAccount()
    }
  render() {
     if(this.state.redirectToHome === true) {
         return (<Redirect to= {`/users/${this.state.createdUser._id}`}></Redirect>)
     }
    return (
        // <StyledView>
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
    <div><button>Sign Up!</button></div>
       </form>
      </div>
    //   </StyledView>
    )
  }
}
