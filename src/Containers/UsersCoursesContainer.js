import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Course from '../Components/Course'
import MeetingsContainer from './MeetingsContainer'
import PastMeetingsContainer from './PastMeetingsContainer'
import moment from 'moment'
import StudentListContainer from './StudentListContainer'
import CreateCourse from '../Components/CreateCourse'
import CreateMeeting from '../Components/CreateMeeting'
import Enroll from "../Components/Enroll"
import DropCourse from '../Components/DropCourse'
import { withRouter } from 'react-router-dom';

class UsersCoursesContainer extends React.Component {

  state = {
    selectedCourseId: 0,
    selectedCourseTitle: "",
    currentMeetings: [],
    previousMeetings: [],
    // allMeetings: [],
    teachers: [],
    students: [],
    selectedCourseStudents: [],
    selectedCourseTeachers: [],
    allCourses: [] 
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
    const key = 'id'
      let newArr = [...new Map(this.props.courses.map(item => [item[key], item])).values()]
    //   console.log(newArr)
      return newArr.map(course => <Course changeHandler={this.changeHandler} key={course.id} course={course} />)
      // return this.props.courses.map(course => <Course changeHandler={this.changeHandler} key={course.id} course={course} />)
  }

  componentDidMount() {
    fetch("http://localhost:3000/courses")
    .then(res => res.json())
    .then(data => {
    
      this.setState({
        allCourses: data //,
      })
    })
    fetch("http://localhost:3000/users")
    .then(response => response.json())
    .then(data => {
      let studentsArr = []
      let teachersArr = []
      for (const user of data) {
        if(!user.is_teacher){
          studentsArr.push(user)
        } else {
          teachersArr.push(user)
        }
      }
      this.setState({
        students: studentsArr,
        teachers: teachersArr
      })
    })
    let todayDate = moment().format('YYYY-MM-DD')
    
    let courses = this.props.courses
    for (const course of courses) {
      fetch("http://localhost:3000/courses/" + course.id)
      .then(resp => resp.json())
      .then(course => {
        this.props.meetingHandler(course.meetings)
        // this.setState({ allMeetings: course.meetings})
        this.setState({
          currentMeetings: this.props.allMeetings.filter(meeting => moment(meeting.date).isAfter(todayDate)),
          previousMeetings: this.props.allMeetings.filter(meeting => moment(todayDate).isAfter(meeting.date))
        })
      })
    }
  }

  changeHandler = (event) => {
    this.setState({
      selectedCourseTitle: event.target.dataset.title
    })
    this.setState({
      selectedCourseId: parseInt(event.target.dataset.id)
    })
    fetch("http://localhost:3000/courses/" + parseInt(event.target.dataset.id))
    .then(res => res.json())
    .then(data => {
      let studentsArr = []
      let teachersArr = []
      let newArr = data.users
      for (const user of newArr) {
        if(!user.is_teacher){
          studentsArr.push(user)
        } else {
          teachersArr.push(user)
        }
      }
      this.setState({
        selectedCourseStudents: studentsArr,
        selectedCourseTeachers: teachersArr
      })
    })
  }

//*   moment('2010-10-20').isAfter('2010-01-01', 'year'); // false
//* moment('2010-10-20').isAfter('2009-12-31', 'year'); // true

  
  
  createMeetingHandler = (meetingObj) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(meetingObj)
    }
    fetch("http://localhost:3000/meetings", options)
    .then(res => res.json())
    .then(data => {
      let newArr = [...this.props.allMeetings, data]
      this.props.meetingHandler(newArr)
      this.props.history.push("/users/courses")
    })
  }

  addCourse = (courseObj) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(courseObj)
    }
    fetch("http://localhost:3000/user_courses", options)
    .then(resp => resp.json())
    .then(data =>{
      let newArray = [...this.props.courses, data.course]
      this.props.addCourseHandler(newArray)
    })
  }

  dropCourse = (courseObj) => {
    let newArray = [...this.props.courses]
    newArray.splice(newArray.indexOf(courseObj), 1)
    this.props.dropCourseHandler(newArray)
    const options = {
      method: 'DELETE'}
    fetch("http://localhost:3000/user_courses/" + courseObj.id, options)
    .then(resp => resp.json())
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
          {this.props.user.is_teacher ?
          <React.Fragment>
            <CreateCourse user={this.props.user} courseHandler={this.props.courseHandler} />
            <CreateMeeting meetingHandler={this.createMeetingHandler} courses={this.props.courses}/>
          </React.Fragment>
          :
          <React.Fragment>
            <h5>STUDENTS</h5>
              <Enroll addCourse={this.addCourse} user={this.props.user} courses={this.state.allCourses} />
              <DropCourse dropCourse={this.dropCourse} courses={this.state.myCourses} user={this.props.user} />
          </React.Fragment>
          }
          <br />
          <br />
          {this.props.user.is_teacher ? <StudentListContainer students={this.state.selectedCourseStudents}/> : null }
          <br />
          <br />
          <MeetingsContainer meetings={this.state.currentMeetings} courseTitle={this.state.selectedCourseTitle} courseID={this.state.selectedCourseId} />
          <PastMeetingsContainer meetings={this.state.previousMeetings} courseTitle={this.state.selectedCourseTitle} courseID={this.state.selectedCourseId} />
          <br />
          <br />
        </React.Fragment>
      );
  }

}

export default withRouter(UsersCoursesContainer)