import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


export default class Activity extends Component {
    state = {
        user: {
            userName: '',
            userId: '',
        },
      activity: [] 
        

    }

    componentDidMount = () => {
        this.showAllActivites()
    }
    showAllActivites = () => {
        const userId = this.props.match.params.userId
        axios.get(`api/users/${userId}/activities`).then(res => {
            this.setState({
                user: {
                    userName: res.data.userName,
                    userId: res.data._id,
                
                },
                activity: res.data.activity,
            })
        })
    }
    render() {
        console.log(this.state.activity, this.state.user)
        return (
            <div>
                <div><Link to='/'>Home Page</Link></div>
                <div><Link to='/login'>Login Page</Link></div>
                <div><Link to={`/${this.state.userId}/createActivity`}>Create an Activity</Link></div>
                <h1>activities:</h1>
                <div>
                   
                    {this.state.activity.map((activity) => {
                        return (
                            <Link
                                key={activity._id}>
                                {activity.title}
                                
                            </Link>

                        )
                    })
                    }
                </div>
            </div>
        )
    }
}
