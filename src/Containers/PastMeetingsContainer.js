import React from 'react'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Meeting from '../Components/Meeting.js'

class PastMeetingsContainer extends React.Component {

    getMeetings = () => {
        let filteredArr = this.props.meetings.filter(meeting => meeting.course_id === this.props.courseID)
        return filteredArr.map(meeting => <Meeting key={meeting.id} meeting={meeting} courseTitle={this.props.courseTitle}/>)
    }

    useRowStyles = () => {
        makeStyles({
        root: {
        '& > *': {
            borderBottom: 'unset',
        },
        },
    });
    }
    render() { 
        return (
        <React.Fragment>
            <h4>Past Meetings</h4>
        <TableContainer style={{"width": "50%"}} component={Paper}>
            <TableHead style={{"backgroundColor": "white"}}>
                <TableRow>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left">Time</TableCell>
                    <TableCell align="center">Link</TableCell>
                    <TableCell align="left">Course</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                    {this.getMeetings()} 
            </TableBody>
        </TableContainer>
        </React.Fragment>
        )
    }
}

export default PastMeetingsContainer;