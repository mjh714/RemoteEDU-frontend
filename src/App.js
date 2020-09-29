import React from 'react';
import './App.css';
import { Switch, Route} from 'react-router-dom';
import Home from './Containers/Home.js'
import MenuAppBar from './Components/NavBar.js'
import StudentCourses from './Containers/UserCourses.js'
import LoginContainer from './Containers/LoginContainer'
import SignupContainer from './Containers/SignupContainer'

class App extends React.Component {

  state = {
    user: {}
  }

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
    .then(console.log)
  }

  loginHandler = (user) => {
    // console.log(user)
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
      console.log(data)
      // this.setState({
      //   user: data
      // }, console.log(this.state.user))
    })
  }

  render(){
    return (
      <div className="App">
        <MenuAppBar />
        <Switch>
          <Route path="/users/courses" component={StudentCourses}/>
          <Route path="/login" component={()=> <LoginContainer loginHandler={this.loginHandler} />}/> 
          <Route path="/signup" component={()=> <SignupContainer signupHandler={this.signupHandler} />}/>
          <Route path="/" component={()=> <Home loggedUser={this.state.user}/> }/>
        </Switch>
      </div>
    ); 
  }
}

export default App;