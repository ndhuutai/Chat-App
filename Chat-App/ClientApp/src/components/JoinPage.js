import React, {Fragment} from 'react';
import {connect} from 'react-redux';

//custom actions
import {bindActionCreators} from 'redux';
import {setGender, setGroup} from '../actions/User';
import {wipeComments} from '../actions/Comment';

//custom components
import GroupList from './GroupList'
import * as signalR from "@aspnet/signalr";
import {UserManager} from "../oidc-client/config";
import {uniqueNamesGenerator} from "unique-names-generator";
import {generate_avatar} from "cartoon-avatar";


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
                    <GroupList groups={this.props.user.groups} className='col-3'/>
                    <div className='col-9'>
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
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    client: state.client
});
const mapDispatchToProps = dispatch => bindActionCreators({
    wipeComments,
    setGender,
    setGroup
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(JoinPage);