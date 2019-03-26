import React, { Component } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

export default class EditUser extends Component {
    state = {
        user: {
            userName: '',
            password: '',
        },
        redirectToHome: false
    }
    componentDidMount = () => {
        axios.get(`/api/users/${this.props.match.params.userId}`)
            .then(res => {
                this.setState({
                    user: {
                        _id: res.data._id,
                        userName: res.data.userName
                    }
                })
            })
    }
    editAccount = () => {
        axios.get(`/api/users/${this.props.match.params.userId}`)
            .then((res) => {
                this.setState({ redirectToHome: true, user: res.data })
            }).catch((err) => {
                console.log('error with editing user', err)
            })
    }
    handleChange = (e) => {
        const editUser = {...this.state.user}
        editUser[e.target.name] =e.target.value
        this.setState({user: editUser})
    }
    handleEditAccount = (e) => {
        e.preventDefault()
        this.editAccount()
    }

    render() { 
        if (this.state.redirectToHome === true) {
            return (<Redirect to ={`/users/${this.state.user.userId}`}></Redirect>)
        }
        return (
            <div>
                <form onSubmit={this.editAccount}>
                    <div>
                        <label htmlFor="userName">Username: </label>
                        <input onChange={this.handleChange}
                            name="userName"
                            type="text"
                            value={this.state.user.userName}></input>
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input onChange={this.handleChange}
                            name="password"
                            type="password"
                            value={this.state.user.password}></input>
                    </div>
                    <div><button>Update!</button></div>
                </form>
            </div>
        )
    }
}