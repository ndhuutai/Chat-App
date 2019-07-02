import axios from 'axios';
import moment from 'moment'
import { addComment } from './Comment';
import { addUser, setUID, setConnectionId } from './User';


export const setConnection = (connection) => ({
    type: 'SET_CONNECTION',
    connection
});

export const startSetConnection = (connection, userName, avatarURL, groupName, gender) => {
    return (dispatch, getState) => {
        //start(open) the connection before setting in redux store
        connection.start().then(() => {
            
            //set connection in redux store
            dispatch(setConnection(connection));
            
            //add user to groupName right away
            connection.invoke('AddUserToDb', {groupName, userName, avatarURL, gender});

            //when receiving transferred message from server
            connection.on("MessageToGroup", (userName, message, avatarURL) => {

                dispatch(addComment(message, userName, avatarURL));
            });

            //when user connect to a groupName
            connection.on('ServerMessageOnConnected', (connectionId) => {
                console.log('im called here');
                setConnectionId(connectionId);
            });

            connection.on('OnAddedToDb', id => {
                dispatch(addUser(id, '', userName, avatarURL, groupName, gender))
            }) ;

            connection.on('ServerMessageOnConnectedToGroup', text => {
                dispatch(addComment(`${text}`));

            });

            connection.on('ServerMessageOnDisconnected', text => {
                dispatch(addComment(`${text}!`));
            });

            connection.on('ServerToGroup', userName => {
                dispatch(addComment(`${userName} has joined the group!`));
            })
        })
    }
};

//call server to add user to groupName
export const addToGroup = (groupName,id) => {
    return (dispatch, getState) => {
        getState().client.connection.invoke('AddToGroup', groupName, id, getState().user.gender);
    }
};

export const setGroup = (groupName) => ({
    type: 'SET_GROUP',
    groupName
});

export const sendToHub = (text, userName, avatarURL, groupName) => {
    return (dispatch, getState) => {
        getState().client.connection.invoke('SendMessageToGroup',text, userName, avatarURL, groupName,moment().utc())
    }
};
