import React, { Component } from "react"
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class ActivityShow extends Component {
    state = {
        user: {
            userId: '',
            userName: '',
        },
        activity: []
    }
    componentDidMount = () => {
        this.showSpecificActivity()
    }
    showSpecificActivity = () => {
        const userId = this.props.match.params.userId
        const activityId = this.props.match.params.activityId
        axios.get(`api/users/${userId}/activity/${activityId}`)
            .then(res => {
                this.setState({
                    activity: res.data.activity,
                    user: {
                        userId: res.data._id,
                        userName: res.data.userName
                        

                    }
                })
            })
    }
    render() {

        return (

            <div>
                <div><Link to="/">Return Home</Link></div>
                <div><Link to={`/${this.state.user.userId}/${this.state.activityId}/activity`}>Activity Page</Link></div>
                <div><Link to={`/${this.state.user.userId}/activity/${this.state.activityId}/edit`}>Edit Activity</Link></div>
                <div>
{/* // {this.state.activity.map(activity => { */}
{/*     return (
      key={activityId}
      activity={activity}
      {activity.title}
      {activity.description}
       {activity.legal}
  )
 })} */}
 
                </div>

            </div>
        )
    }
}