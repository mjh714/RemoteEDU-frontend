import React from 'react'
import MenuItem from '@material-ui/core/MenuItem';

class Course extends React.Component {

    changeHandler = (e) => {
        this.props.changeHandler(e)
    }

    render() {
        return(
            <>
                <MenuItem onClick={this.changeHandler} data-title={this.props.course.title} data-id={this.props.course.id}>{this.props.course.title} - {this.props.course.length}</MenuItem>
            </>
        )
    }
}

export default Course