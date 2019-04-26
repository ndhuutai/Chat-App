import React from 'react';
import { connect } from 'react-redux';
import { Message, Form, Grid, Comment, Button } from "semantic-ui-react";
import { bindActionCreators } from 'redux';
import * as signalR from '@aspnet/signalr';
import { uniqueNamesGenerator } from 'unique-names-generator';
import CommentContainer from "./CommentContainer";
import { addComment, wipeComments } from '../actions/Comment';
import { startSetConnection, sendToHub , addToGroup} from '../actions/Connection';

import { generate_avatar } from 'cartoon-avatar';


//initializations
const randomName = uniqueNamesGenerator();

class Chat extends React.Component {

    onSubmit = (e) => {
        e.preventDefault();
        if(e.target.input.value.trim() !== '') {
            this.props.sendToHub(e.target.input.value, this.props.user.userName, this.props.user.avatarURL, this.props.user.group);
        }
        e.target.input.value = ''
    }

    componentDidMount() {
        //send a request to get chat from database then populate the redux store

        //wipe comments when user connect to a different room
       
        //if the connection is already set up, and user change room, only add the user to the new group
        //and going through startSetConnection is not adding user to the new group
        if(this.props.client.connection !== undefined) {
            this.props.addToGroup(this.props.user.group,this.props.user.userName);
        }
        //if there's already an established connection, move on
        if(this.props.client.connection) {
            return;
        }
        this.props.startSetConnection(new signalR.HubConnectionBuilder().withUrl('/chatHub').build(), uniqueNamesGenerator(),generate_avatar(this.props.user.gender), this.props.user.group);
    }

    render() {
        return (
            <div>
                <h1>Welcome to the Chat Application!</h1>
                {this.props.comments.length < 1 ? <Message info >
                    <Message.Header>Seeing nothing?</Message.Header>
                    <p>Be the first to send message!</p>
                </Message> : ''}

                <Comment.Group>
                    {this.props.comments.map((comment, index) => (
                        <CommentContainer key={index} {...comment}></CommentContainer>
                    ))}
                </Comment.Group>


                <Form onSubmit={this.onSubmit} autoComplete='off'>
                    <Grid columns={2} stackable>
                        <Grid.Row divided={true} stretched>
                            <Grid.Column width={13}>
                                <Form.Input name='input' placeholder='Enter your message here' />
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Button>Send Message</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments,
        user: state.user,
        client: state.client
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ 
    startSetConnection,
    addToGroup, 
    sendToHub, 
    addComment, 
    wipeComments,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
