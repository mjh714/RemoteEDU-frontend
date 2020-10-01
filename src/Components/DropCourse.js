import React from 'react';
import Button from '@material-ui/core/Button';
import CourseSelect from './CourseSelect'

class DropCourse extends React.Component {

    state = {
        open: false,
        courseObj: {},
        allUserCourses: []
    }

    handleClick = () => {
        this.setState({ open: !this.state.open });
    };

    componentDidMount = () => {
        fetch("http://localhost:3000/user_courses")
        .then(res => res.json())
        .then(data => {
            this.setState({ allUserCourses: data})
        })
    };
    

    changer = (e) => {
        let foundCourse = this.state.allUserCourses.find(userCourse => userCourse.user_id === this.props.user.id && userCourse.course_id === e.target.value)
        this.setState({
            courseObj: foundCourse
        })
    }

    submitDrop = (e) => {
        e.preventDefault()
        this.props.dropCourse(this.state.courseObj)
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        return(
            <React.Fragment>
                <Button variant="contained" color="primary" style={{"margin": "20px"}} onClick={this.handleClick}>
                    Drop A Course
                </Button>
                {this.state.open ? 
                    <form onSubmit={this.submitDrop}>
                    <CourseSelect courses={this.props.courses} clickHandler={this.changer}/>
                    <br />
                    <br />
                    <Button type="submit" variant="contained" color="primary">Drop Course</Button>
                    </form>
                    : null}
            </React.Fragment>
        )
    }
}

export default DropCourse;