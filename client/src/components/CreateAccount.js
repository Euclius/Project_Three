import React, { Component } from 'react'
import axios from 'axios'
import {Redirect, Link} from 'react-router-dom'
import styled from 'styled-components'

const Params = styled.h1`
color: darkblue;
`
const Button = styled.button`
background-color:green;
`

const Input = styled.input`
background-color: black;
color:white;
font-size:20px;
`

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
          <Button><button><Link to='/'>Return Home</Link></button></Button>
          <form onSubmit={this.handleSignUp}>
          <div>
       <Params> <label htmlFor="userName">Username: </label></Params>
        <Input onChange={this.handleChange}
        name="userName"
        type="text"
        value={this.state.user.userName}></Input>
        </div>
        <div>
           <Params><label htmlFor="password">Password: </label></Params>
           <Input onChange={this.handleChange}
           name="password"
           type="password"
           value={this.state.user.password}></Input>
        </div>
    <div><Button><button>Sign Up!</button></Button></div>
       </form>
      </div>
    //   </StyledView>
    )
  }
}
