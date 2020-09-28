import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Course from '../Components/Course'
import MeetingsContainer from './MeetingsContainer'
import PastMeetingsContainer from './PastMeetingsContainer'
import moment from 'moment'



class StudentCoursesContainer extends React.Component {

  //! rename this to UserCoursesContainer to be rusable and dynamic for either teachers or students

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

  changeHandler = (event) => {
    //? If event.target.value === 'Courses' => show all meetings 

    this.setState({
      selectedCourseTitle: event.target.dataset.title
    })
    this.setState({
      selectedCourseId: parseInt(event.target.dataset.id)
    })
  }

//*   moment('2010-10-20').isAfter('2010-01-01', 'year'); // false
//* moment('2010-10-20').isAfter('2009-12-31', 'year'); // true

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
          <MeetingsContainer meetings={this.state.currentMeetings} courseTitle={this.state.selectedCourseTitle} courseID={this.state.selectedCourseId} />
          <PastMeetingsContainer meetings={this.state.previousMeetings} courseTitle={this.state.selectedCourseTitle} courseID={this.state.selectedCourseId} />
        </React.Fragment>
      );
  }

}

export default StudentCoursesContainer