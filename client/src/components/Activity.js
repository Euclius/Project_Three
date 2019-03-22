import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


export default class Activity extends Component {
    state = {
        users: {
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
                            _id: res.data._id,
                            userName: res.data.userName
                        }
                    })
                })

        }
    }
    render() {
        return (
            <div>
                <div><Link to='/'>Home Page</Link></div>
                <div><Link to='/login'>Login Page</Link></div>
                <div><Link to='/createActivity'>Create an Activity</Link></div>
                <h1>activities:</h1>
                {/* {this.state.activity.map(activity => {
                    return (
                        <Activity
                            key={activity._id}
                            activity={activity} />
                    )
                }
                )
                } */}
            </div>
        )
    }
}