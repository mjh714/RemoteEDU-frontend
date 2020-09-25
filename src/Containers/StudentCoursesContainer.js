import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Course from '../Components/Course'
import MeetingsContainer from './MeetingsContainer'




class StudentCoursesContainer extends React.Component {

  state = {
    selectedCourseId: 0,
    selectedCourseTitle: ""
  }

    useStyles = () => {
        makeStyles((theme) => ({
            formControl: {
              margin: theme.spacing(1),
              minWidth: 120,
            },
            selectEmpty: {
              marginTop: theme.spacing(2),
            },
          }));   
    }
    
  classes = () => this.useStyles();
  
  getCourses = () => {
      return this.props.courses.map(course => <Course changeHandler={this.changeHandler} key={course.id} course={course} />)
  }

  // filterCourses = () => {
  //   let filteredArr = this.props.courses.filter(meeting => meeting.course_id === this.props.courses.some(course => course.id))
  //       // console.log(filteredArr)
  //   return filteredArr.map(meeting => <Meeting key={meeting.id} meeting={meeting}/>)
  // }

  changeHandler = (event) => {
    // console.log(event.target.dataset.id)
    // debugger
    this.setState({
      selectedCourseTitle: event.target.dataset.title
    })
    this.setState({
      selectedCourseId: parseInt(event.target.dataset.id)
    })
  }

  render(){
      return (
        <React.Fragment>
          <FormControl style={{"width": "50%"}} className={this.classes()}>
            <InputLabel id="demo-simple-select-label">{this.state.selectedCourseTitle ? this.state.selectedCourseTitle : "Courses"}</InputLabel>
            <Select
                onChange={this.changeHandler}
                labelId="demo-simple-select-label"
                id="demo-simple-select">
                {this.getCourses()}
            </Select>
          </FormControl>
          <br />
          <br />
          <MeetingsContainer courseTitle={this.state.selectedCourseTitle} courseID={this.state.selectedCourseId} />
        </React.Fragment>
      );
  }

}

export default StudentCoursesContainer