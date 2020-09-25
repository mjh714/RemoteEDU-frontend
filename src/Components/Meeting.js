import React from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class Meeting extends React.Component {
    // state = {
    //     courses: []
    // }

    // componentDidMount() {
    // }

    // getCourseTitle = () => {
    //     // let foundCourse = this.props.courses.find(course => course.id === this.props.meeting.course_id)
    //     // return foundCourse["title"]
    //     // console.log(foundCourse)
    // }

    render() {
        // console.log(this.state.courses)
        // let foundCourse = this.state.courses.find(course => course.id === this.props.meeting.course_id)
        
        // let foundCourse = this.state.courses.find(course => course.id === this.props.meeting.course_id)
        // console.log(foundCourse.title)
        return (
            <React.Fragment>
                <TableRow>
                    <TableCell align="left">{this.props.meeting.date}</TableCell>
                    <TableCell align="left">{this.props.meeting.time}</TableCell>
                    <TableCell align="left"><a href={this.props.meeting.link} alt={this.props.courseTitle} target="_blank">{this.props.meeting.link}</a></TableCell>
                    <TableCell align="left">{this.props.courseTitle}</TableCell>
                </TableRow>
            </React.Fragment>
        );
    }
}
 
export default Meeting;