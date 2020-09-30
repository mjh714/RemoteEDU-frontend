import React from 'react';
import Signup from '../Components/Signup'

class SignupContainer extends React.Component {

    render() {
        return <Signup signupHandler={this.props.signupHandler} />
    }
}

export default SignupContainer