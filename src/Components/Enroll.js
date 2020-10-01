import React from 'react';
import Button from '@material-ui/core/Button';
import CourseSelect from './CourseSelect'

class Enroll extends React.Component {

    state = {
        open: false,
        userCourse: {
            user_id: 0,
            course_id: 0
        }
    }

    handleClick = () => {
    this.setState({ open: !this.state.open });
    };

changer = (e) => {
    this.setState({
        userCourse: {
            ...this.state.userCourse,
            user_id: this.props.user.id,
            course_id: e.target.value
        }
    })
}

submitCourse = (e) => {
    e.preventDefault()
    this.props.addCourse(this.state.userCourse)
    this.setState({
        open: !this.state.open
    })
}

    render() {  
        return (
        <React.Fragment>
        <Button variant="contained" color="primary" style={{"margin": "20px"}} onClick={this.handleClick}>
            Enroll In A Course
        </Button>
        {this.state.open ? 
        <form onSubmit={this.submitCourse}>
        <CourseSelect courses={this.props.courses} clickHandler={this.changer}/>
        <br />
        <br />
        <Button type="submit" variant="contained" color="primary">Enroll</Button>
        </form>
        : null}
        </React.Fragment>
    );
    }
}


export default Enroll;