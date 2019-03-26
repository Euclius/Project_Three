import React, { Component } from 'react'
import axios from 'axios';

export default class EditActivity extends Component {

state={
    activity: {},
    redirectToActivityPage: false,
    activityEdited: false
}    

componentDidMount = () => {
    axios.get(`/api/users/${this.props.match.params.userId}/activities/${this.props.match.params.activityId}`)
    .then (res => {
        this.setState({
            activity: res.data.activity
        })
    })
}

activityEdit = () => {
    axios.get(`/api/users/${this.props.match.params.userId}/activities/${this.props.match.params.activityId}`)
    .then (res => {
        this.setState({
            activity: res.data.activity, 
            activityEdited: true, 
            redirectToActivityPage: true
        }).catch((err) => {
            console.log('error with activityEdit function', err)
        })

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
        return (
            <div>
                <form onSubmit={this.handleActivityEdit}>
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
        )
    }
}