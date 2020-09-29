import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './Containers/Home.js'
import MenuAppBar from './Components/NavBar.js'
import StudentCourses from './Containers/UserCourses.js'
import LoginContainer from './Containers/LoginContainer'
import SignupContainer from './Containers/SignupContainer'

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <MenuAppBar />
        <Switch>
          <Route path="/users/courses" component={StudentCourses}/>
          <Route path="/login" component={LoginContainer}/> 
          <Route path="/signup" component={SignupContainer}/>
          <Route path="/" component={Home}/>
        </Switch>
      </div>
    ); 
  }
}

export default App;