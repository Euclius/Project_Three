import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import styled from 'styled-components'

// const StyledView = styled.View`
// background-color: papayawhip;
// `

const Params = styled.h1`
color: darkblue;
`
const Button = styled.button`
background-color:green;
`

const Input = styled.input`
background-color: black;
color:white;
font-size:20px;
`

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
            this.setState({ redirectToHome: true, activity: res.data })
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
                <Button>
                <button><Link to='/'>Return Home</Link></button>
</Button>
                <form onSubmit={this.handleActivityCreate}>
                    <div>
                        <Params><label htmlFor="title">Title: </label> </Params>
                        <Input onChange={this.handleAlter}
                            name="title"
                            type="text"
                            value={this.state.activity.title}></Input>
                    </div>
                    <div>
                        <Params> <label htmlFor="description">Description: </label></Params>
                        <Input onChange={this.handleAlter}
                            name="description"
                            type="text"
                            value={this.state.activity.description}></Input>
                    </div>
                    <div>
                        <Params>     <label htmlFor="legal">Legal:</label></Params>
                        <Input onChange={this.handleAlter}
                            name="legal"
                            type="text"
                            value={this.state.activity.legal}></Input>
                    </div>
                    <button>Post Activity!</button>
                </form>
            </div>
            // </StyledView>
        )
    }
}
