import React from 'react'
import Login from '../Components/Login'
// import { Redirect } from 'react-router-dom';

class LoginContainer extends React.Component {

    render(){
        return(
            <React.Fragment>
                <h1 style={{"textAlign": "center"}}>Login</h1>
                <Login loginHandler={this.props.loginHandler} />
            </React.Fragment>
        )
    }
}

export default LoginContainer