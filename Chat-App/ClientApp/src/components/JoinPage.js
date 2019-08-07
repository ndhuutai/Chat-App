import React, {Fragment} from 'react';
import {Grid, Form, Select, Input, Button, Label} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {setGender, setGroup} from '../actions/User';
import {wipeComments} from '../actions/Comment';


const options = [
    {key: 'm', text: 'Male', value: 'male'},
    {key: 'f', text: 'Female', value: 'female'}
];


class JoinPage extends React.Component {

    onClick = (e) => {
        if (this.props.comments.length > 0) {
            this.props.wipeComments();
        }
    };
    onSubmit = (e) => {
        e.preventDefault();

        if (this.props.comments.length > 0) {
            this.props.wipeComments();
        }

        this.props.history.push('/chat');
    };

    onRoomChange = (e) => {
        this.props.setGroup(e.target.value);
    };

    onGenderChange = (e) => {
        console.log(e);
        this.props.setGender(e.target.innerText);
    };

    render() {
        return (
            <form className="m-auto w-50" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="roomName">Room Name</label>
                    <input type="text"
                           className="form-control"
                           id="roomName"
                           placeholder="name of room"
                           autoComplete="off"
                           onChange={this.onRoomChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" id="gender" onChange={this.onGenderChange}
                            className="form-control">
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                    </select>
                </div>
                <button
                    className="btn btn-primary">Join
                </button>
            </form>
        )
    }
}

// (<Form>
// 	<Grid centered columns={3}>
// 		<Grid.Row>
// 			<Grid.Column>
// 				<Form.Field>
// 					<Form.Input autoComplete='off' name='input' placeholder='Room Name'
// 								label='Chat Room' onChange={this.onRoomChange}/>
// 				</Form.Field>
// 			</Grid.Column>
// 		</Grid.Row>
// 		<Grid.Row>
// 			<Grid.Column>
// 				<Form.Field>
// 					<Select options={options} placeholder='Gender' onChange={this.onGenderChange}/>
// 				</Form.Field>
// 			</Grid.Column>
// 		</Grid.Row>
// 		<Grid.Row>
// 			<Grid.Column stretched>
// 				<Button onClick={this.onClick}>
// 					<NavLink tag={Link} className="text-dark" to="/chat">Join</NavLink>
// 				</Button>
// 			</Grid.Column>
// 		</Grid.Row>
// 	</Grid>
// </Form>)

const mapStateToProps = state => ({
    user: state.user,
    comments: state.comments
});
const mapDispatchToProps = dispatch => bindActionCreators({
    wipeComments,
    setGender,
    setGroup
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(JoinPage);