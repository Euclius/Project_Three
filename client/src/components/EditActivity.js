import React, { Component } from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import styled from 'styled-components'

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
           
            <div>
                <form onSubmit={this.handleActivityEdit}>
                    <div>
                       <Params><label htmlFor="title">Title: </label></Params> 
                        <Input onChange={this.handleAlter}
                            name="title"
                            type="text"
                            value={this.state.activity.title || ''}/>
                    </div>
                    <div>
                        <Params><label htmlFor="description">Description: </label></Params>
                        <Input onChange={this.handleAlter}
                            name="description"
                            type="text"
                            value={this.state.activity.description || ''}/>
                    </div>
                    <div>
                        <Params><label htmlFor="legal">Legal:</label></Params>
                        <Input onChange={this.handleAlter}
                            name="legal"
                            type="text"
                            value={this.state.activity.legal || ''}/>
                    </div>
                    <Button><button>Post Activity!</button></Button>
                </form>
            </div>
          
        )
    }
}