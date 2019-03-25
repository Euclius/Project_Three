import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

export default class User extends Component {
  state = {
    user: {
      userId: '',
      userName: '',
    },
    activity: [{
      title: ''
    }]
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
    console.log('HWELLOWJE')
    const userId = this.props.match.params.userId
    axios.delete(`/api/users/${userId}`)
      .then(() => {
        this.props.history.goBack()
      })
  }
  // handleRemove = (e) => {
  //   const userId = this.state.user.userId
  //   // e.preventDefault()
  //   axios.delete(userId)
  //     .then(res => {
  //       console.log(res.data)
  //     }).catch((err) => {
  //       console.log('error with handleRemove', err)
  //     })
  // }
  render() {
    console.log(this.state.user)
    return (
      <div>
        <h1>Activities from
          <Link to={`/users/${this.state.user.userId}`} key={this.state.user.userId}>{this.state.user.userName}</Link>
          {/* <div>{this.state.users.map((user) => {
              return (<Link to={`/users/${user._id}`} 
              key={user._id}>{user.userName}</Link>)})}</div> */}

        </h1>




        {/* <div>{this.state.activity.description}</div> */}




        {/* <div> {this.state.activity.map(activity => {
                    return (
                        <Link
                            key={activity._id}>
                            {activity.title}
                            </Link>
                            {activity.description}
                   )})}</div> */}


        <div>{this.state.activity.map((activity) => {
          return (
            <Link
              key={activity._id}>
              {activity.title}
            </Link>

          )
        })
        }
        </div>
        <div><Link to='/'>Home Page</Link></div>
        <div><Link to={`/${this.state.user.userId}/createActivity`}>Create an Activity</Link></div>
        <div><button onClick={() => this.deleteUser(this.state.user.userId)}>delete user</button></div>

      </div>
    )
  }
}

