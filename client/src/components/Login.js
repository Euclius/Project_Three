import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const Header = styled.h1`
color:blueviolet;
font-size: 23px;
`
const UL = styled.ul`
color: green;
font-size: 14px;
vertical-align: baseline;
`

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
         <Header> <h1>Pick which username you are</h1></Header>
        <UL>
            <ul> {this.state.users.map((user) => {
              return (<Link to={`/users/${user._id}`} 
              key={user._id}> {user.userName}</Link>)
          })}</ul>
          </UL> 
          
        <div><Link to='/createAccount'>Create an account</Link></div>
        <div><Link to='/'> Return Home</Link></div>
      </div>
    )
  }
}
