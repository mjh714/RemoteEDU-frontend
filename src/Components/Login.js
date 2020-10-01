import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



class Login extends React.Component {
    
    state = {
        email: "",
        password: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.loginHandler(this.state)
    }

    render() {
        return(
            
            <form onSubmit={this.submitHandler}>
                <div>
                <TextField
                    type="email"
                    label="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    variant="outlined"
                />
                </div>
                <br />
                <div>
                <TextField
                    type="password"
                    label="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    variant="outlined"
                />
                </div>
                <br />
                {/* <br /> */}
                <Button type="submit" variant="contained" color="primary">
                    Login
                </Button>
            </form>
        )
    }
}

export default Login;