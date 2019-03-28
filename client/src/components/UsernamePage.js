import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import styled from 'styled-components'

const Button = styled.button`
background-color: green;
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

export default class Username extends Component {
  state = {
    user: {
      userId: '',
      userName: '',
    },
    activity: []

  }
  componentDidMount = () => {
    if (this.props.match.params) {
      axios.get(`/api/users/${this.props.match.params.userId}`)
        .then(res => {
          this.setState({
            activity: res.data.activity,
            user: {
              userName: res.data.userName,
              userId: res.data._id

            }
          })
        })
    }
  }
  deleteUser = () => {
    const userId = this.props.match.params.userId
    axios.delete(`/api/users/${userId}`)
      .then(() => {
        this.props.history.goBack()
      })
  }

  render() {

    return (
      
      
      <div>
        <Button>
        <button><Link to='/'>Home Page</Link></button>
        <button><Link to={`/${this.state.user.userId}/createActivity`}>Create an Activity</Link></button>
        <button onClick={() => this.deleteUser(this.state.user.userId)}>Delete user</button>
        </Button>
       <Header> <h1>Activities from: 
          <Link to={`/users/${this.state.user.userId}`} key={this.state.user.userId}><div>{this.state.user.userName}</div>
          </Link>
        </h1></Header>
        <UL><div>{this.state.activity.map((activity) => {
          return (
            <Link to={`/${this.state.user.userId}/activityShow/${activity._id}`}
              key={activity._id}>
             <div> {activity.title}</div>
            </Link>
          )
        }
        )
        }
        </div></UL>

      </div>
      
    )
  }
}

