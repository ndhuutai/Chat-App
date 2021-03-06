import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Message} from 'semantic-ui-react';
import {bindActionCreators} from 'redux';
import {addComment, wipeComments} from '../actions/Comment';
import { sendToHub, sendPrivateMessage,addToPrivateGroup, addToGroup} from '../actions/Connection';
import {setGroup} from '../actions/User';


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
        
        console.log(user);
        
        let config = {
            headers: {
                'Authorization' : `Bearer ${user.access_token}`
            }
        };
        
        let response = await axios.get('https://localhost:5001/identity/id', config);
        
        // let userIdResponse = await axios.get('https://localhost:5001/identity/id', config);
        console.log({response});
        // console.log({userIdResponse})
    };

    onSubmit = (e) => {
        e.preventDefault();
        const {user, group} = this.props;
        debugger;
        const groupToSend = user.groups.find(g => g.name === group.name);
        console.log(user);
        if (e.target.input.value.trim() !== '') {
            if(groupToSend.isPrivate) {
                console.log('im being sent privately');
                this.props.sendPrivateMessage(e.target.input.value, 0 , user.sub, groupToSend.name);
            }
            this.props.sendToHub(e.target.input.value, user.userName, user.avatarURL, groupToSend.name);
        }
        e.target.input.value = '';
    };

    onUserClick = (userNameText) => {
        //wipe comments when changing to a different room
        this.props.wipeComments();
        
        //find user in user array property of group state (redux)
        let clickedUser = this.props.group.users.find(user => user.userName === userNameText);
        
        //creating a unique room with both users' subs.
        this.props.addToPrivateGroup(`${this.props.user.sub}.${clickedUser.sub}`, this.props.user.id, clickedUser.id);
    };

    onExpandClick = () => {
        this.setState(() => ({maxUsers: this.state.maxUsers + 5}))
        //send extra user down
    };

    transformUsers = (maxUsers) => {
        return this.props.group.users.slice(0, maxUsers);
    };

    componentDidMount() {
    }

    render() {

        const {user, group} = this.props;

        return (
            <Fragment>
                {group.name === 'default' ? <h1>Public chat room</h1> : <h1>{group.name}</h1>}
                
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
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments,
        user: state.user,
        group: state.group
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    addToGroup,
    addToPrivateGroup,
    sendToHub,
    sendPrivateMessage,
    addComment,
    wipeComments,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
