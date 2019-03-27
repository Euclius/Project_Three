import React, { Component } from "react"
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class ActivityShow extends Component {
    state = {
        user: {
            userId: '',
            userName: '',
       
        },
         activity: [{
             title: '',
             description: '',
             legal: ''
         }]
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
                    activity: {
                        title: res.data.title,
                        description: res.data.description,
                        legal: res.data.legal
                    },
                    user: {
                        userId: res.data.userId,
                        userName: res.data.userName
                        
                    }
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
                <div><Link to={`/${this.state.user.userId}/activities/${this.state.activityId}/edit`}>Edit Activity</Link></div>
                <button onClick={()=> this.deleteActivity(this.state.activity)}>Delete Activity</button>
                <div>
                    
                    {this.state.activity.map((activity) => {
                     return (
                         <div key={activity}>
                         {activity.title}
                         {activity.description}
                         {activity.legal}
                         </div>
                     )   
                    })}
 
                </div>

            </div>
        )
    }
}