import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

// const StyledView = styled.view`
// background-color: papayawhip;
// `

const Header = styled.h1`
color: darkblue;
font-size: 23px;
display: flex;
`
const Paragraph = styled.h4`
color: darkblue;
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
   

    render() {
        return (
            // <StyledView>
            <div>
                <Header><h1>Activities around Atlanta</h1></Header>
                <Path>
                    <div> <Link to="/login">Login</Link></div>
                </Path>
               <Paragraph><h4>Bored in Atlanta? Want some ideas of what you can do on the cheap? Login to gather some ideas</h4></Paragraph> 
            </div>
             //</StyledView> 
        )
    }
}
