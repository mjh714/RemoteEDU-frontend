import React from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class CourseSelect extends React.Component {

    optionsCourses = () => {
        return this.props.courses.map(course => {
            return (
            <MenuItem value={course.id}>{course.title}</MenuItem>
            )
        })
    }

    render() {
        return(
            <React.Fragment>
            <Select
                name="course_id"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.props.courseId}
                onChange={this.props.clickHandler}
            >           
                {this.optionsCourses()}
            </Select>
            </React.Fragment>
        )
    }
}

export default CourseSelect;