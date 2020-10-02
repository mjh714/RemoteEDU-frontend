import React from 'react'
import Student from '../Components/Student'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

class StudentListContainer extends React.Component {

    getStudents = () => {
        return this.props.students.map(student => <Student key={student.id} student={student}/>)
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
        return(
        <React.Fragment>
            <h4>Students</h4>
            <TableContainer style={{"maxWidth": "15%"}} component={Paper}>
                <TableHead style={{"backgroundColor": "white"}}>
                    <TableRow>
                        <TableCell align="left">Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.getStudents()}
                </TableBody>
            </TableContainer>
        </React.Fragment>
        )
    }
}

export default StudentListContainer