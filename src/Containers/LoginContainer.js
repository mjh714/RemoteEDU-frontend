import React from 'react'
import Login from '../Components/Login'

class LoginContainer extends React.Component {

    render(){
        return(
            <React.Fragment>
                <h1>Login</h1>
                <Login />
            </React.Fragment>
        )
    }
}

export default LoginContainer