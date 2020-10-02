import React from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import Home from './Containers/Home.js'
import NavBar from './Components/NavBar.js'
import UserCourses from './Containers/UserCourses.js'
import LoginContainer from './Containers/LoginContainer'
import SignupContainer from './Containers/SignupContainer'

class App extends React.Component {

  state = {
    user: null,
    userCourses: []
  }

  componentDidMount = () => {
    const token = localStorage.getItem("token")
    if(token){
      fetch("http://localhost:3000/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`},
        })
      .then(resp => resp.json())
      .then(data => this.setState({ user: data.user }))
    } 
  };
  

  signupHandler = (newUser) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(newUser)
    }
    fetch("http://localhost:3000/users", options)
    .then(res => res.json())
    .then(data => {
      this.setState({
        user: data.user
      },() => this.props.history.push("/users/courses"))
    })
  }

  loginHandler = (user) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(user)
    }
    fetch("http://localhost:3000/login", options)
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("token", data.jwt)
      this.setState({
        user: data.user,
        userCourses: data.user.courses
      }, () => this.props.history.push("/users/courses"))
    })
  }

  render(){
    return (
      <React.Fragment>
        <NavBar user={this.state.user} />
        <Switch>
          <Route exact path="/users/courses" component={() => <UserCourses user={this.state.user} courses={this.state.userCourses} />}/>
          <Route exact path="/login" component={()=> <LoginContainer loginHandler={this.loginHandler} />}/> 
          <Route exact path="/signup" component={()=> <SignupContainer signupHandler={this.signupHandler} />}/>
          <Route exact path="/" component={()=> <Home loggedUser={this.state.user}/> }/>
        </Switch>
      </React.Fragment>
    ); 
  }
}

export default withRouter(App);