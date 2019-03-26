import React, {Component} from "react"
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class ActivityShow extends Component{
    state = {
        user: {
            userId: '',
            user: '',
        },
        activity: []
    }
    componentDidMount = () => {
        this.showAllActivites()
    }
    showAllActivites = () => {
        const userId = this.props.match.params.userId
        const activityId = this.props.match.params.activityId
        axios.get(`api/users/${userId}/activities/${activityId}`)
        .then(res => {
            this.setState({
                activity: res.data.activity,
            })
        })
    }
    render () {

    return (
    
        <div>
<div><Link to= "/">Return Home</Link></div>
<div><Link to= "/activity">Activity Page</Link></div>
<div><Link to= {`/${this.state.userId}/activity/${this.state.activityId}/edit`}>Edit Activity</Link></div>
<div>

</div>

</div>
    )
}
}