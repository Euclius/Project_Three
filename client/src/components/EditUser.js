import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

// const StyledView = styled.View`
// background-color: papayawhip;
// `

export default class EditUser extends Component {
    state = {
        user: {
            userName: '',
        },
        redirectToHome: false,
        userEdited: false
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
                this.setState({
                    redirectToHome: true,
                    userEdited: res.data
                })
            }).catch((err) => {
                console.log('error with editing user', err)
            })
    }
    handleChange = (e) => {
        const editUser = { ...this.state.user }
        editUser[e.target.name] = e.target.value
        this.setState({ user: editUser })
        console.log("showing handleChange", e)
    }
    handleEditAccount = (e) => {
        e.preventDefault()
        this.editAccount()
    }

    render() {
        if (this.state.redirectToHome === true &&
            this.state.userEdited === true) {
            return (<Redirect to={`/users/${this.state.user.userId}`}></Redirect>)
        }
        return (
            // <StyledView>
            <div>
                <form onSubmit={this.HandleEditAccount}>
                    <div>
                        <label htmlFor="userName">Username: </label>
                        <input
                            onChange={this.handleChange}
                            name="userName"
                            type="text"
                            value={this.state.user.userName}
                        />
                    </div>
                    <div><button>Update!</button></div>
                </form>
            </div>
            // </StyledView>
        )
    }
}