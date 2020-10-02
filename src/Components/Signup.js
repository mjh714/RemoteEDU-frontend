import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Signup extends React.Component {

    state = {
        full_name: "",
        email: "",
        password: ""
    }

    changer = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitter = (e) => {
        e.preventDefault()
        this.props.signupHandler(this.state)
    }

    render() {
        return (
            <form style={{"margin": "50px"}} onSubmit={this.submitter}>
                <h2>Sign-Up Form</h2>
                <TextField type="text" name="full_name" label="Full Name" variant="outlined" onChange={this.changer}/><br /><br />
                <TextField type="text" name="email" label="email" variant="outlined" onChange={this.changer}/><br /><br />
                <TextField type="password" name="password" label="password" variant="outlined" onChange={this.changer} /><br /><br />
                <Button type="submit" variant="contained" color="primary">Signup</Button>
            </form>
        )
    }
}

export default Signup;