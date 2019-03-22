import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class HomePage extends Component {

    render() {
        return (
            <div>
                <h1>Activities around Atlanta</h1>
                <div> <Link to="/login">Login</Link></div>
                <div>  <Link to="/activity">Activities</Link></div>
                <h4>Bored in Atlanta? Want some ideas of what you can do on the cheap? Click the Activities link to gather some ideas</h4>
            </div>
        )
    }
}
