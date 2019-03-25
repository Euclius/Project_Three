import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

export default class User extends Component {
    state={
user: {
        userName: '',
        activity: []
    }
  }
componentDidMount = () => {
    if (this.props.match.params) {
        axios.get(`/api/users/${this.props.match.params.userId}`)
        .then(res => {
            this.setState({
                activity: res.data.activity,
                user: {
                    userName: res.data.userName
                }
            })
        })
    }
}
deleteUser = () => {
  const userId = this.props.match.params.userId
  axios.delete(`/api/users/${userId}`)
  .then(() => {
    return axios.get('/api/login')
  })
  .then(res => {
    console.log(res.data)

    this.setState({users: res.data})
  })
}
handleRemove = (e) => {
  const userId = this.state.userId
  // e.preventDefault()
  axios.delete(userId)
  .then (res => {
    console.log(res.data)
  }).catch((err) => {
    console.log('error with handleRemove', err)
  })
}
  render() {
    return (
      <div>
        <h1>Activities from 
          <Link to ={`/users/${this.state.user._id}`} key={this.state.user._id}>{this.state.user.userName}</Link>
          {/* <div>{this.state.users.map((user) => {
              return (<Link to={`/users/${user._id}`} 
              key={user._id}>{user.userName}</Link>)})}</div> */}
              
              </h1>
        {/* {this.state.activity.map(activity => {
                    return (
                        <Activity
                            key={activity._id}
                            activity={activity} />
                    )
                }
                )
                } */}
        <div><Link to='/'>Home Page</Link></div>
        <div><Link to='/createActivity'>Create an Activity</Link></div>
        <div><button onClick= {() => this.handleRemove(this.userId)}>delete user</button></div>
        {/* <div><button onClick= {()=> this.deleteUser(this.userId)}>delete user</button></div> */}
      </div>
    )
  }
}
// {()=>this.props.match.params.deleteUser(this.props.user)}
