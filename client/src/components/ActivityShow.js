import React, { Component } from "react"
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

// const StyledView = styled.View`
// background-color: papayawhip;
// `

const Button = styled.button`
background-color: green;
`

const Font = styled.div`
color: tomato;
font-size: 18px;
padding: 3px;
`

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
            // <StyledView>
            <div>
                <Button>
                <button><Link to="/">Return Home</Link></button>
                <button><Link to={`/${this.props.match.params.userId}/activities/${this.props.match.params.activityId}/edit`}>Edit Activity</Link></button>
                <button onClick={() => this.deleteActivity(this.state.activity)}>Delete Activity</button>
                </Button>
                <div>
                    <Font>
                    <div key={this.state.activity._id}>
                        <div> title: {this.state.activity.title}</div>
                        <div> description: {this.state.activity.description}</div>
                        <div>legal: {this.state.activity.legal}</div>
                    </div>
                    </Font>
                </div>
            </div>
            // </StyledView>
        )
    }
}