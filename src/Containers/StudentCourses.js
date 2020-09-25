import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import StudentCoursesContainer from './StudentCoursesContainer'

class StudentCourses extends React.Component {
    
    state = {
        courses: []
    }

    render() {
        return(
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="lg">
                    <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
                    <StudentCoursesContainer courses={this.state.courses} />
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

export default StudentCourses