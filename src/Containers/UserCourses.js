import React from 'react'
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import UsersCoursesContainer from './UsersCoursesContainer'

class UserCourses extends React.Component {

    state = {
        courses: [],
        courseTitle: "",
        allMeetings: []
    }

    createCourseHandler = (courseObj) => {
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            },
            body: JSON.stringify(courseObj)
        }
        fetch("http://localhost:3000/courses", options)
        .then(response => response.json())
        .then(data => {
            this.addToDashboard(data.id, this.props.user.id)
            let newCourses = [...this.state.courses, data]
            this.setState({
                courses: newCourses
            })
        })
    }

    addToDashboard = (courseId, userId) => {
        fetch("http://localhost:3000/user_courses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }, body: JSON.stringify({
                user_id: userId,
                course_id: courseId
            })
        })
        .then(resp => resp.json())
        .then(data => {
            let newCourses = [...this.state.courses, data.course]
            // debugger
            // console.log(data)
            // debugger
            this.setState({
                courses: newCourses
                // courseTitle: data.course.title
            })
        })
    }

    componentDidMount() {
        if(this.props.user){
            this.setState({
                courses: this.props.user.courses
            })
        }  else {
            this.props.history.push("/login")
        }
    }

    dropCourseHandler = (newArr) => {
        this.props.user.courses = newArr
        this.setState({
            courses: this.props.user.courses
        })
    }

    addCourseHandler = (newArr) => {
        this.props.user.courses = newArr
        this.setState({
            courses: this.props.user.courses
        })
    }

    meetingHandler = (newArray) => {
        this.setState({
            allMeetings: newArray
        })
    }

    render() {
        return(
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="lg">
                    <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: 'auto'}}>
                    {this.props.user ? <UsersCoursesContainer meetingHandler={this.meetingHandler} allMeetings={this.state.allMeetings} addCourseHandler={this.addCourseHandler} dropCourseHandler={this.dropCourseHandler} user={this.props.user} courses={this.props.user.courses} courseTitle={this.state.courseTitle} courseHandler={this.createCourseHandler} /> : <h1>Loading</h1>}
                    </Typography>
                </Container>
            </React.Fragment>
        )
    }
}

export default withRouter(UserCourses)