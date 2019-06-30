import axios from 'axios';
import moment from 'moment'
import { addComment } from './Comment';
import { addUser, setUID, setConnectionId } from './User';


export const setConnection = (connection) => ({
    type: 'SET_CONNECTION',
    connection
});

export const startSetConnection = (connection, userName, avatarURL, group, gender) => {
    return (dispatch, getState) => {
        //start(open) the connection before setting in redux store
        connection.start().then(() => {
            
            //set connection in redux store
            dispatch(setConnection(connection));
            
            //add user to group right away
            connection.invoke('AddUserToDb', {group, userName, avatarURL, gender});

            //when receiving transferred message from server
            connection.on("MessageToGroup", (userName, message, avatarURL) => {

                dispatch(addComment(message, userName, avatarURL));
            });

            //when user connect to a group
            connection.on('ServerMessageOnConnected', (connectionId) => {
                
                setConnectionId(connectionId);
            });

            connection.on('OnAddedToDb', id => {
                dispatch(addUser(id, '', userName, avatarURL,group, gender))
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

//call server to add user to group
export const addToGroup = (groupName,id) => {
    return (dispatch, getState) => {
        getState().client.connection.invoke('AddToGroup', groupName, id, getState().user.gender);
    }
};

export const setGroup = (group) => ({
    type: 'SET_GROUP',
    group
});

export const sendToHub = (text, userName, avatarURL, group) => {
    return (dispatch, getState) => {
        getState().client.connection.invoke('SendMessageToGroup',text, userName, avatarURL, group,moment().utc())
    }
};
