import React from 'react'
import Login from '../Components/Login'
import { Redirect } from 'react-router-dom';

class LoginContainer extends React.Component {

    render(){
        return(
            <React.Fragment>
            {this.props.user ? <Redirect to="/users/courses"/> : 
            <React.Fragment>
                <h1>Login</h1>
                <Login loginHandler={this.props.loginHandler} />
            </React.Fragment>
            }
            </React.Fragment>
        )
    }
}

export default LoginContainer