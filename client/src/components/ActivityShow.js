import React, { Component } from "react"
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class ActivityShow extends Component {
    state = {
        user: {
            userId: '',
            userName: '',

        },
        activity: {
            title: '',
            description: '',
            legal: ''
        }
    }
    componentDidMount = () => {
        this.showSpecificActivity()
    }
    showSpecificActivity = () => {
        const userId = this.props.match.params.userId
        const activityId = this.props.match.params.activityId
        axios.get(`/api/users/${userId}/activity/${activityId}`)
            .then(res => {
                this.setState({
                    activity: res.data,
                })
            })
        }
    deleteActivity = () => {
        const userId = this.props.match.params.userId
        const activityId = this.props.match.params.activityId
        axios.delete(`/api/users/${userId}/activities/${activityId}`)
            .then(() => {
                this.props.history.goBack()
            })
    }
    render() {

        return (
            <div>
                <div><Link to="/">Return Home</Link></div>
                <div><Link to={`/${this.state.user.userId}/activity/${this.state.activityId}`}>Activity Page</Link></div>
                <div><Link to={`/${this.props.match.params.userId}/activities/${this.props.match.params.activityId}/edit`}>Edit Activity</Link></div>
                <button onClick={() => this.deleteActivity(this.state.activity)}>Delete Activity</button>
                <div>
                    <div key={this.state.activity._id}>
                        <div> title: {this.state.activity.title}</div>
                        <div> description:{this.state.activity.description}</div>
                        <div>legal:{this.state.activity.legal}</div>
                    </div>
                </div>
            </div>
        )
    }
}