import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './Containers/Home.js'
import MenuAppBar from './Components/NavBar.js'
import StudentCourses from './Containers/UserCourses.js'

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <MenuAppBar />
        <Switch>
          <Route path="/users/courses" component={StudentCourses}/>
          <Route path="/" component={Home}/>
        </Switch>
      </div>
    ); 
  }
}

export default App;