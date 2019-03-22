import React, { Component } from 'react'
import axios from 'axios'
import {Redirect, Link} from 'react-router-dom'

export default class CreateActivity extends Component {
    state ={
        activity:{
        title:'',
        description:'',
        legal:''
        },
        createdActivty: {},
        redirectToHome: false
    }

    activityCreate = () => {
        axios.post(`/api/users/:userId/activities`).then(res => {
            this.setState({activity: res.data})
        })
    }
    handleAlter = (e) => {
        const newActivity = {...this.state.activity}
        newActivity[e.target.name] = e.target.value
        this.setState({activity: newActivity})
    }
    handleActivityCreate = (e) => {
        e.prevent.Default()
        this.createdActivty()
    }
  render() {
      if(this.state.redirectToHome === true) {
          return (<Redirect to= {`users/:userId/${this.state.createdActivty._id}`}></Redirect>)
      }
    return (
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
    )
  }
}
