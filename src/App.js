import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './Containers/Home.js'
import MenuAppBar from './Components/NavBar.js'
import StudentCourses from './Containers/StudentCourses.js'

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <MenuAppBar />
        <Switch>
          <Route path="/students/courses" component={StudentCourses}/>
          <Route path="/" component={Home}/>
        </Switch>
      </div>
    ); 
  }
}

export default App;