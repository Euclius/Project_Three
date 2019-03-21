import React, {Component} from 'react'
import {Link} from 'react-router-dom'


export default class Activity extends Component {
    render() {
    return(
        <div>
            <h1>activities:</h1>
        <div><Link to ='/'>Home Page</Link></div>
        <div><Link to='/login'>Login Page</Link></div>
        </div>
    )
}
}