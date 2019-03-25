import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


export default class Activity extends Component {
    state = {
        user: {
            userName: ''
        },
          
users: [],
            activity: []
        }
    
    componentDidMount = () => {
      this.showAllActivites()
    }
    showAllActivites = () => {
        const userId = this.props.match.params.userId
        axios.get(`api/users/${userId}/activities`).then(res => {
            this.setState({activity: res.data})
        })
    }
    render() {
        return (
            <div>
                <div><Link to='/'>Home Page</Link></div>
                <div><Link to='/login'>Login Page</Link></div>
                <div><Link to={`/${this.state.userId}/createActivity`}>Create an Activity</Link></div>
                <h1>activities:</h1>
                {/* <div> 
                {
                    this.state.users.map((user) => {
                        return (
                            <Link
                                to={`/user/${user._id}`}
                                key={user._id}
                            >
                            {user.userName}
                            </Link>
                        )
                    })
                }
                 {this.state.activity.map((activity) => {
                    return (
                        <Link to={`/users/${this.props.userId}/activity/${activity._id}`}
                            key={activity._id}
                            >{activity.title}</Link>
                    )
                }
                )
                }
                </div> */}
            </div>
        )
    }
}
