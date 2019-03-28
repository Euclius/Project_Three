import React, { Component } from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import styled from 'styled-components'

// const StyledView = styled.View`
// background-color: papayawhip;
// `

export default class EditActivity extends Component {

state={
    activity: [{
        title: '',
        description: '',
        legal: ''
    }],
    redirectToActivityPage: false,
    activityEdited: false
}    

componentDidMount = () => {
    axios.get(`/api/users/${this.props.match.params.userId}/activity/${this.props.match.params.activityId}`)
    .then (res => {
        this.setState({
            activity: res.data
        })
    })
}

activityEdit = () => {
const userId = this.props.match.params.userId
const activityId = this.props.match.params.activityId
const payload = this.state.activity


    axios.put(`/api/users/${userId}/activities/${activityId}`,payload)
    .then (res => {
        this.setState({
            activity: res.data, 
            activityEdited: true, 
            // redirectToActivityPage: true
        })
        this.props.history.goBack()
        })

    
}

handleAlter = (e) => {
    const editActivity = {...this.state.activity}
    editActivity[e.target.name]=e.target.value
    this.setState({activity: editActivity})
}

handleActivityEdit = (event) => {
    event.preventDefault()
    this.activityEdit()
}

    render() {
        
        if (this.state.redirectToActivityPage === true 
            && this.state.activityEdited === true) {
                return (<Redirect to= {`/users/${this.state.userId}/activitiy/${this.state.activityEdited_id}`}></Redirect>)
            }
        return (
            // <StyledView>
            <div>
                <form onSubmit={this.handleActivityEdit}>
                    <div>
                        <label htmlFor="title">Title: </label>
                        <input onChange={this.handleAlter}
                            name="title"
                            type="text"
                            value={this.state.activity.title || ''}/>
                    </div>
                    <div>
                        <label htmlFor="description">Description: </label>
                        <input onChange={this.handleAlter}
                            name="description"
                            type="text"
                            value={this.state.activity.description || ''}/>
                    </div>
                    <div>
                        <label htmlFor="legal">Legal:</label>
                        <input onChange={this.handleAlter}
                            name="legal"
                            type="text"
                            value={this.state.activity.legal || ''}/>
                    </div>
                    <button>Post Activity!</button>
                </form>
            </div>
            // </StyledView>
        )
    }
}