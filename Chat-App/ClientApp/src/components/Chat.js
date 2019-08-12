import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Message, Form, Grid, Comment, Button} from 'semantic-ui-react';
import {Col, Container, ListGroup, ListGroupItem, Row} from 'reactstrap';
import {bindActionCreators} from 'redux';
import * as signalR from '@aspnet/signalr';
import {uniqueNamesGenerator} from 'unique-names-generator';
import uuidv4 from 'uuid/v4';
import {addComment, wipeComments} from '../actions/Comment';
import {startSetConnection, sendToHub, addToGroup} from '../actions/Connection';
import {startSetGroup} from "../actions/Group";

import {generate_avatar} from 'cartoon-avatar';
import UserList from './UserList'
import CommentList from './CommentList'
import CommentForm from './CommentForm'

//testing api delete after user
import axios from 'axios';
import { UserManager } from "../oidc-client/config";

class Chat extends React.Component {

    state = {
        maxUsers: 5
    };
    
    callApi =  async () => {
        let user = await UserManager.getUser();
        
        let response = await axios.get('https://localhost:5001/identity', {
            headers: {
                'Authorization' : `Bearer ${user.access_token}`
            }
        });
        
        console.log({response});
    };

    onSubmit = (e) => {
        e.preventDefault();
        const {user} = this.props;
        if (e.target.input.value.trim() !== '') {
            this.props.sendToHub(e.target.input.value, user.userName, user.avatarURL, user.groupName);
        }
        e.target.input.value = '';
    };

    onUserClick = (userNameText) => {
        this.props.wipeComments();
        this.props.addToGroup(userNameText, this.props.user.id);
    };

    onExpandClick = () => {
        this.setState(() => ({maxUsers: this.state.maxUsers + 5}))
        //send extra user down
    };

    transformUsers = (maxUsers) => {
        return this.props.group.users.slice(0, maxUsers);
    };

    componentDidMount() {

        const {user, client} = this.props;
        //send a request to get chat from database for a specific groupName then populate the redux store

        //wipe comments when user connect to a different room
        //if the connection is already set up, and user change room, only add the user to the new groupName
        //and going through startSetConnection is not adding user to the new groupName
        if (client.connection !== undefined) {
            this.props.addToGroup(user.groupName, user.id, user.gender);
        }
        //if there's already an established connection, no need to set up again.
        if (client.connection) {
            return;
        }
        this.props.startSetConnection(new signalR.HubConnectionBuilder()
                .withUrl('/chatHub', {
                    accessTokenFactory: async () => {
                        let user = await UserManager.getUser();
                        return user.access_token;
                    }
                })
                .configureLogging(signalR.LogLevel.Information)
                .build(),
            uniqueNamesGenerator(),
            generate_avatar(user.gender ? {gender: user.gender} : ''),
            user.gender || 'not specified',
            user.groupName || 'default');
    }

    render() {

        const {user} = this.props;

        return (
            <Fragment>
                {user.groupName === 'default' ? <h1>Public chat room</h1> : <h1>Group name: {user.groupName}</h1>}
                <button onClick={this.callApi}>Call Api</button>
                {this.props.comments.length < 1 ? <Message info>
                    <Message.Header>Seeing nothing?</Message.Header>
                    <p>Be the first to send message!</p>
                </Message> : ''}

                <div className='row'>
                    <div className='col-md-4 p-0'>
                        <UserList users={this.transformUsers(this.state.maxUsers)}
                                  onClick={this.onUserClick}
                                  onExpand={this.onExpandClick}
                                  hasMoreUsers={this.props.group.users.length > this.state.maxUsers}/>
                    </div>
                    <div className='col-md-8 p-0'>
                        <CommentList comments={this.props.comments}/>
                        <CommentForm onSubmit={this.onSubmit}/>
                    </div>
                </div>
                {/*<button onClick={this.callApi}>Call Api here :)</button>*/}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments,
        user: state.user,
        client: state.client,
        group: state.group
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    startSetConnection,
    addToGroup,
    sendToHub,
    addComment,
    wipeComments,
    startSetGroup
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
