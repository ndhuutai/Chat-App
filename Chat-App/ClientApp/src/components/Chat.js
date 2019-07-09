import React from 'react';
import {connect} from 'react-redux';
import {Message, Form, Grid, Comment, Button} from 'semantic-ui-react';
import {Col, Container, ListGroup, ListGroupItem, Row} from 'reactstrap';
import {bindActionCreators} from 'redux';
import * as signalR from '@aspnet/signalr';
import {uniqueNamesGenerator} from 'unique-names-generator';
import {addComment, wipeComments} from '../actions/Comment';
import {startSetConnection, sendToHub, addToGroup} from '../actions/Connection';
import {generate_avatar} from 'cartoon-avatar';
import UserList from './UserList'
import CommentList from './CommentList'
import CommentForm from './CommentForm'

class Chat extends React.Component {

	onSubmit = (e) => {
		e.preventDefault();
		const {user} = this.props;
		if (e.target.input.value.trim() !== '') {
			this.props.sendToHub(e.target.input.value, user.userName, user.avatarURL, user.groupName);
		}
		e.target.input.value = '';
	};

	componentDidMount() {
		
		const {user, client} = this.props;
		//send a request to get chat from database for a specific groupName then populate the redux store

		//wipe comments when user connect to a different room
		//if the connection is already set up, and user change room, only add the user to the new groupName
		//and going through startSetConnection is not adding user to the new groupName
		if (this.props.client.connection !== undefined) {
			this.props.addToGroup(user.groupName, user.id, user.gender);
		}
		//if there's already an established connection, no need to set up again.
		if (client.connection) {
			return;
		}
		this.props.startSetConnection(new signalR.HubConnectionBuilder()
				.withUrl('/chatHub')
				.configureLogging(signalR.LogLevel.Information)
				.build(),
			uniqueNamesGenerator(),
			generate_avatar(user.gender?{gender: user.gender}: ''),
			user.groupName || 'default',
			user.gender || 'not specified');
	}

	render() {
		
		const {user} = this.props;
		
		return (
			<Container>
				{user.groupName === 'default'?<h1>Public chat room</h1>: <h1>Group name: {user.groupName}</h1> }

				{this.props.comments.length < 1 ? <Message info>
					<Message.Header>Seeing nothing?</Message.Header>
					<p>Be the first to send message!</p>
				</Message> : ''}

				<Row>
					<Col xs='3'>
						<UserList/>
					</Col>
					<Col xs='9'>
						<CommentList comments={this.props.comments}/>
						<CommentForm onSubmit={this.onSubmit}/>
					</Col>
				</Row>
			</Container>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		comments: state.comments,
		user: state.user,
		client: state.client
	}
};

const mapDispatchToProps = dispatch => bindActionCreators({
	startSetConnection,
	addToGroup,
	sendToHub,
	addComment,
	wipeComments,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
