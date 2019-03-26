import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Header = styled.h1`
color: blueviolet;
font-size: 23px;
`

const Path = styled.div`
color: green;
font-size: 14px;
`

export default class HomePage extends Component {
    state = {
        user: {
            userId: '',
            userName: ''
        },
        activity: []
    }
    componentDidMount = () => {

    }

    render() {
        return (
            <div>
                <Header><h1>Activities around Atlanta</h1></Header>
                <Path>
                    <div> <Link to="/login">Login</Link></div>
                    <div>  <Link to={`/${this.state.user.userId}/${this.state.activity._id}/activity`}>Activities</Link></div>
                </Path>
                <h4>Bored in Atlanta? Want some ideas of what you can do on the cheap? Click the Activities link to gather some ideas</h4>
            </div>
        )
    }
}
