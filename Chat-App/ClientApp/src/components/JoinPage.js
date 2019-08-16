import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {generate_avatar} from "cartoon-avatar";
import {UserManager} from "../oidc-client/config";
import {uniqueNamesGenerator} from "unique-names-generator";
import * as signalR from "@aspnet/signalr";

//custom actions
import {bindActionCreators} from 'redux';
import {setGender, setGroup} from '../actions/User';
import {wipeComments} from '../actions/Comment';
import {setUsersInGroup} from '../actions/Group';

import {startSetConnection, addToGroup} from '../actions/Connection';


//custom components
import GroupList from './GroupList'
import JoinForm from './JoinForm'


class JoinPage extends React.Component {

    state = {
        room: '',
        gender: ''
    }

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
        this.props.setUsersInGroup([]);
        this.props.addToGroup(this.props.user.groupName, this.props.user.id);

        this.props.history.push('/chat');
    };

    onRoomChange = (e) => {
        //setting group of user state
        this.props.setGroup(e.target.value);
    };

    onGenderChange = (e) => {
        this.props.setGender(e.target.value);
    };
    
    onGroupClick = (e) => {
        let groupName = e.target.innerText;
        if(this.props.comments.length > 0) {
            this.props.wipeComments();
        }

        this.props.setUsersInGroup([]);
        this.props.setGroup(groupName);
        //using innerText here since dispatch above isn't finished and thus
        //the following dispatch would be accessing the old props.user.groupName (if used here)
        this.props.addToGroup(groupName,this.props.user.id);
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
        return (
            <Fragment>
                <div className='row'>
                    <GroupList groups={this.props.user.groups} className='col-3' onGroupClick={this.onGroupClick}/>
                    <div className='col-9'>
                        <JoinForm onSubmit={this.onSubmit}
                        onRoomChange={this.onRoomChange}
                        onGenderChange={this.onGenderChange}
                        onClick={this.onClick}/>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    comments: state.comments,
    client: state.client
});
const mapDispatchToProps = dispatch => bindActionCreators({
    startSetConnection,
    addToGroup,
    setUsersInGroup,
    wipeComments,
    setGender,
    setGroup
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(JoinPage);