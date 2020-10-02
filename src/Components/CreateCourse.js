import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class CreateCourse extends React.Component {

    state = {
        title: "",
        length: "",
        student_count: 0,
        student_cap: 30
    }

    handleClick = () => {
    this.setState({ open: !this.state.open });
    };

    changer = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    submitCourse = (e) => {
        e.preventDefault()
        this.props.courseHandler(this.state, this.props.user)
        this.setState({
            title: "",
            length: "",
            student_cap: 30
        })
    }

    render() {     
        return (
        <div>
        <Button variant="contained" color="primary" style={{"margin": "20px"}} onClick={this.handleClick}>
            Create A Course
        </Button>
            {this.state.open ? 
            <form style={{"margin": "20px"}} onSubmit={this.submitCourse}>
                <label>Course Title</label><br /><br />
                <TextField type="text" value={this.state.title} name="title" onChange={this.changer} /><br />
                <label>Course Length</label><br /><br />
                <TextField type="text" value={this.state.length} name="length" onChange={this.changer}/><br />
                <label>Student Cap</label><br /><br />
                <TextField type="number" value={this.state.student_cap} name="student_cap" onChange={this.changer}/><br /><br />
                <Button type="submit" variant="contained" color="primary">Create</Button>
            </form>
            : null}
        </div>
        );
    }
}

export default CreateCourse;

