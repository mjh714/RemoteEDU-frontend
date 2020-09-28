import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import UsersCoursesContainer from './UsersCoursesContainer'

class UserCourses extends React.Component {
    
    state = {
        courses: []
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
            let newCourses = [...this.state.courses, data]
            this.setState({
                courses: newCourses
            })
        })
      }

    render() {
        return(
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="lg">
                    <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: 'auto'}}>
                    <UsersCoursesContainer courses={this.state.courses} courseHandler={this.createCourseHandler} />
                    </Typography>
                </Container>
            </React.Fragment>
        )
    }

    componentDidMount() {
        fetch("http://localhost:3000/courses")
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                courses: data
            })
        })
    }
}

export default UserCourses