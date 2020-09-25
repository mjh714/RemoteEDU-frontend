import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Course from '../Components/Course'
import MeetingsContainer from './MeetingsContainer'
import PastMeetingsContainer from './PastMeetingsContainer'
import moment from 'moment'



class StudentCoursesContainer extends React.Component {

  state = {
    selectedCourseId: 0,
    selectedCourseTitle: "",
    currentMeetings: [],
    previousMeetings: [],
    allMeetings: []
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

  componentDidMount() {
    fetch("http://localhost:3000/meetings")
    .then(resp => resp.json())
    .then(meetingData => {
      let todayDate = moment().format('YYYY-MM-DD')

      this.setState({
        allMeetings: meetingData,
      })
      this.setState({
        currentMeetings: this.state.allMeetings.filter(meeting => moment(meeting.date).isAfter(todayDate)),
        previousMeetings: this.state.allMeetings.filter(meeting => moment(todayDate).isAfter(meeting.date))
      })
    }
      
    )
  }

  // getMeetings = () => {
  //   let filteredArr = this.state.allMeetings.filter(meeting => meeting.course_id === this.props.courseID)
  //   return filteredArr.map(meeting => <Meeting key={meeting.id} meeting={meeting} courseTitle={this.props.courseTitle}/>)
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

//*   moment('2010-10-20').isAfter('2010-01-01', 'year'); // false
//* moment('2010-10-20').isAfter('2009-12-31', 'year'); // true

  // pastMeetingHandler = () => {
  //   let todayDate = moment().format('YYYY-MM-DD')
  //   let past = this.state.allMeetings.filter(meeting => moment(todayDate).isAfter(meeting.date))
  //     this.setState({
  //       previousMeetings: past
  //     })
  // }

  // currentMeetingHandler = () => {
  //   let todayDate = moment().format('YYYY-MM-DD')
  //   let current = this.state.allMeetings.filter(meeting => moment(meeting.date).isAfter(todayDate))
  //     this.setState({
  //       currentMeetings: current
  //     })
  // }

  render(){
    console.log(this.state.currentMeetings)
    // console.log(this.state.previousMeetings)
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
          <MeetingsContainer meetings={this.state.currentMeetings} courseTitle={this.state.selectedCourseTitle} courseID={this.state.selectedCourseId} />
          <PastMeetingsContainer meetings={this.state.previousMeetings} courseTitle={this.state.selectedCourseTitle} courseID={this.state.selectedCourseId} />
        </React.Fragment>
      );
  }

}

export default StudentCoursesContainer