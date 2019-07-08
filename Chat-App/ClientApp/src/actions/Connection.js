import axios from 'axios';
import moment from 'moment'
import { addComment } from './Comment';
import { addUser, setUID, setConnectionId } from './User';


export const setConnection = (connection) => ({
    type: 'SET_CONNECTION',
    connection
});


function onMessageToGroup({connection, dispatch}) {
    connection.on("MessageToGroup", (userName, message, avatarURL) => {
        dispatch(addComment(message, userName, avatarURL));
    });
}

function onAddedToDb({connection, dispatch}) {
    connection.on('OnAddedToDb', ({id, connectionId, userName, avatarUrl, groupName, gender}) => {
        dispatch(addUser(id, connectionId, userName, avatarUrl, groupName, gender))
    });
}

function onServerMessageOnConnectedToGroup({connection, dispatch}) {
    connection.on('ServerMessageOnConnectedToGroup', text => {
        dispatch(addComment(`${text}`));
    });
}

function onServerMessageOnDisconnected({connection, dispatch}) {
    connection.on('ServerMessageOnDisconnected', text => {
        dispatch(addComment(`${text}!`));
    });
}

function onServerToGroup({connection, dispatch}) {
    connection.on('ServerToGroup', userName => {
        dispatch(addComment(`${userName} has joined the group!`));
    });
}

export const startSetConnection = (connection, userName, avatarURL, groupName, gender) => {
    
    return (dispatch, getState) => {
        
        const eventListeners = composeListeners(
            onMessageToGroup,
            onAddedToDb,
            onServerMessageOnConnectedToGroup,
            onServerMessageOnDisconnected,
            onServerToGroup
        );
        
        eventListeners({connection, dispatch});
        
        
        connection.start().then(() => {
            dispatch(setConnection(connection));
            //add user to groupName right away
            connection.invoke('AddUserToDb', {groupName, userName, avatarURL, gender});

        }).catch(error => console.log(error));

    }
};

//call server to add user to groupName
export const addToGroup = (groupName, id) => {
    return (dispatch, getState) => {
        getState().client.connection.invoke('AddToGroup', {groupName, userId: id, gender: getState().user.gender}); //user state
    }
};

export const setGroup = (groupName) => ({
    type: 'SET_GROUP',
    groupName
});

export const sendToHub = (text, userName, avatarURL, groupName) => {
    return (dispatch, getState) => {
        getState().client.connection.invoke('SendMessageToGroup',text, userName, avatarURL, groupName,moment().utc()) // user state + comment text
    }
};

const composeListeners = (...functions) => 
    (arg) =>
        functions.reduce((composed, f) => {
            f(composed);
            return composed;
        }, arg);
