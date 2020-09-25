import React from 'react';
// import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class Meeting extends React.Component {
    // state = {
    //     courses: []
    // }

    render() {
        return (
            <React.Fragment>
                <TableRow>
                    <TableCell align="left">{this.props.meeting.date}</TableCell>
                    <TableCell align="left">{this.props.meeting.time}</TableCell>
                    <TableCell align="left"><a href={this.props.meeting.link} alt={this.props.courseTitle} target="_blank" rel="noopener noreferrer">{this.props.meeting.link}</a></TableCell>
                    <TableCell align="left">{this.props.courseTitle}</TableCell>
                </TableRow>
            </React.Fragment>
        );
    }
}
 
export default Meeting;