import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

export default class User extends Component {
    state={
        userName: '',
        activity: []
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

  render() {
    return (
      <div>
        <h1>Activities:</h1>
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
      </div>
    )
  }
}
