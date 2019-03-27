import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const UL = styled.ul`
padding: 2px;
border-radius: 2px;
border-color: black;
color: green;
`

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
        axios.get(`/api/users/${userId}`).then(res => {
            console.log(res.data)
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
        // console.log(this.state.activity, this.state.user)
        return (
            <div>
                <div><Link to='/'>Home Page</Link></div>
                <div><Link to='/login'>Login Page</Link></div>
                <div><Link to={`/${this.state.userId}/createActivity`}>Create an Activity</Link></div>
                <h1>activities:</h1>

                <UL>
                <ul>
                    {this.state.activity.map((activity) => {
                        return (
                            <Link to={`/${this.state.user.userId}/activity/${activity._id}`}
                                key={activity._id}>
                                {activity.title}
                                 
                            </Link>
                        )
                    })
                    }
                </ul>
                </UL>

            </div>
        )
    }
}
