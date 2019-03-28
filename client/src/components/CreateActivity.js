import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import styled from 'styled-components'

// const StyledView = styled.View`
// background-color: papayawhip;
// `

export default class CreateActivity extends Component {
    state = {
        user: {
            userId: '',
            userName: ''
        },
        activity: {
            title: '',
            description: '',
            legal: ''
        },
        activities: [],
        redirectToHome: false
    }

    componentDidMount = () => {
        if (this.props.match.params) {
            axios.get(`/api/users/${this.props.match.params.userId}`)
                .then(res => {
                    this.setState({
                        activities: res.data.activity,
                        user: {
                            _id: res.data._id,
                            userName: res.data.userName
                        }
                    })
                })

        }
    }
    activityCreate = () => {
        const userId = this.props.match.params.userId
        const activityId = this.props.match.params.userId
        axios.post(`/api/users/${userId}/activities/${activityId}`, {
            activity: this.state.activity
        }).then(res => {
           
            const activityList = [...this.state.activities]
            activityList.unshift(res.data)
            this.setState({redirectToHome: true, activity: res.data })
        })
        
    }
    handleAlter = (e) => {
        const newActivity = { ...this.state.activity }
        newActivity[e.target.name] = e.target.value
        this.setState({ activity: newActivity })
       
    }
    handleActivityCreate = (e) => {
        e.preventDefault()
        this.activityCreate()
    }
    render() {
        if (this.state.redirectToHome === true) {
            return (<Redirect to={`/users/${this.state.user._id}`}></Redirect>)
        }

        return (
            // <StyledView>
            <div>
                <Link to='/'>Return Home</Link>

                <form onSubmit={this.handleActivityCreate}>
                    <div>
                        <label htmlFor="title">Title: </label>
                        <input onChange={this.handleAlter}
                            name="title"
                            type="text"
                            value={this.state.activity.title}></input>
                    </div>
                    <div>
                        <label htmlFor="description">description: </label>
                        <input onChange={this.handleAlter}
                            name="description"
                            type="text"
                            value={this.state.activity.description}></input>
                    </div>
                    <div>
                        <label htmlFor="legal">Legal:</label>
                        <input onChange={this.handleAlter}
                            name="legal"
                            type="text"
                            value={this.state.activity.legal}></input>
                    </div>
                    <button>Post Activity!</button>
                </form>
            </div>
            // </StyledView>
        )
    }
}
