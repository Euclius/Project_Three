import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import styled from 'styled-components'

const Button = styled.button`
background-color: green;
`

const Header = styled.h1`
color:blueviolet;
font-size: 23px;
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
      // <StyledView>
      
      <div>
        <Button>
        <button><Link to='/'>Home Page</Link></button>
        <button><Link to={`/${this.state.user.userId}/createActivity`}>Create an Activity</Link></button>
        <button onClick={() => this.deleteUser(this.state.user.userId)}>delete user</button>
        </Button>
       <Header> <h1>Activities from: 
          <Link to={`/users/${this.state.user.userId}`} key={this.state.user.userId}>{this.state.user.userName}
          </Link>
        </h1></Header>
        <div>{this.state.activity.map((activity) => {
          return (
            <Link to={`/${this.state.user.userId}/activityShow/${activity._id}`}
              key={activity._id}>
              {activity.title}
            </Link>
          )
        }
        )
        }
        </div>

      </div>
      
    )
  }
}

