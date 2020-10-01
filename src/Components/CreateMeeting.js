import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MeetingSelect from './MeetingSelect'


class CreateMeeting extends React.Component {

    state = {
        meeting: {
            date: "",
            time: "",
            link: "",
            course_id: 0,
        },
        courses: []
    }

    handleClick = () => {
        this.setState({ open: !this.state.open });
    };

changer = (e) => {
    console.dir(e.target)
    this.setState({
        meeting: {...this.state.meeting,
            [e.target.name] : e.target.value
        }
    })
}

submitMeeting = (e) => {
    e.preventDefault()
    this.props.meetingHandler(this.state.meeting)
    this.setState({
        open: !this.state.open
    })
}

    render() {  
        console.log(this.state.course_id)   
        return (
        <div>
            <Button variant="contained" color="secondary" style={{"margin": "20px"}} onClick={this.handleClick}>
                Create A Meeting
            </Button>
            {this.state.open ? 
            <form style={{"margin": "20px"}} onSubmit={this.submitMeeting}>
                <label>Date</label><br /><br />
                <TextField type="date" value={this.state.title} name="date" placeholder="2020-09-24" onChange={this.changer} /><br />
                <label>Time</label><br /><br />
                <TextField type="time" value={this.state.length} name="time" placeholder="4:20 PM" onChange={this.changer}/><br />
                <label>Link</label><br /><br />
                <TextField type="text" value={this.state.student_cap} name="link" onChange={this.changer}/><br /><br />
                <label>Course</label><br /><br />
                <MeetingSelect changer={this.changer} courses={this.props.courses} courseId={this.state.course_id}/>
                <br /><br />
                <Button type="submit" variant="contained" color="primary">Create</Button>
            </form>
            : console.log("false")}
        </div>
        );
    }
}

export default CreateMeeting;