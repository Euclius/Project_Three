import React, {Component} from 'react'
import {Link} from 'react-router-dom'


export default class Activity extends Component {
    state ={
        users: {
            userName:''
        },
        activity: {
            title: '',
            description: '',
            legal:''
        }
    }

    render() {
    return(
        <div>
        <div><Link to ='/'>Home Page</Link></div>
        <div><Link to='/login'>Login Page</Link></div>
        <h1>activities:</h1>

        </div>
    )
}
}