import React from 'react';
import { connect } from 'react-redux';
import { Message, Form, Grid, Comment } from "semantic-ui-react";
import { bindActionCreators } from 'redux';
import * as signalR from '@aspnet/signalr';
import { uniqueNamesGenerator } from 'unique-names-generator';
import CommentContainer from "./CommentContainer";
import { addComment, sendToHub } from '../actions/Comment';
import { startSetConnection } from '../actions/Connection';

import { generate_avatar } from 'cartoon-avatar';


//initializations
const randomName = uniqueNamesGenerator();

class Home extends React.Component {

    onSubmit = (e) => {
        e.preventDefault();
        this.props.sendToHub(e.target.input.value, this.props.user.userName, this.props.user.avatarURL);
        e.target.input.value = ''
    }

    componentDidMount() {
        this.props.startSetConnection(new signalR.HubConnectionBuilder().withUrl('/chatHub').build(), uniqueNamesGenerator(),generate_avatar());
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
                        <Grid.Row divided={true} verticalAlign='middle'>
                            <Grid.Column width={14}>
                                <Form.Input name='input' placeholder='Enter your message here' />
                            </Grid.Column>
                            <Grid.Column width={1}>
                                <Form.Button>Send Message</Form.Button>
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

const mapDispatchToProps = dispatch => bindActionCreators({ sendToHub, addComment, startSetConnection }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home);
