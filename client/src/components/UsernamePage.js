import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

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
    console.log(this.state.user)
    return (
      <div>
        <h1>Activities from 
          <Link to={`/users/${this.state.user.userId}`} key={this.state.user.userId}>{this.state.user.userName}</Link>

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
            <Link to={`/${this.state.user.userId}/${activity._id}/activityShow`}
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

