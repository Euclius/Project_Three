import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const Button = styled.button`
background-color:green;
`
const Header = styled.h1`
color:darkblue;
font-size: 23px;
`
const UL = styled.ul`
color: green;
padding: 5em;
font-size: 18px;
vertical-align: text-top;
text-decoration:none;
`
export default class Login extends Component {
  state = {
    users: []
  }
  componentDidMount = () => {
    this.showAllUsers()
  }
  showAllUsers = () => {
    axios.get('/api/users').then(res => {
      this.setState({ users: res.data })
    })
  }
  render() {
    return (
      <div>
        <div>
          <Button>
            <button><Link to='/createAccount'>Create an account</Link></button>
            <button><Link to='/'> Return Home</Link></button>
          </Button>
        </div>
        <Header> <h1>Pick which username you are or view activities from other users.</h1></Header>
        <UL>
          <ul> {this.state.users.map((user) => {
            return (<Link to={`/users/${user._id}`}
              key={user._id}> <div>{user.userName}</div> </Link>)
          })}</ul>
        </UL>
      </div>
    )
  }
}
