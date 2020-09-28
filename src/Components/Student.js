import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class Student extends React.Component {

    render() {
        return (
            <React.Fragment>
                <TableRow>
                    <TableCell align="left">{this.props.student.full_name}</TableCell>
                </TableRow>
            </React.Fragment>
        );
    }
}
 
export default Student;