import { addComment } from './Comment';
import { addUser } from './User';

export const setConnection = (connection) => ({
    type: 'SET_CONNECTION',
    connection
})

export const startSetConnection = (connection, randomName, avatarURL, group) => {
    return (dispatch) => {
        //start(open) the connection before setting in redux store
        connection.start().then(() => {
            
            //set connection in redux store
            dispatch(setConnection(connection));
            
            //add user to group right away
            connection.invoke('AddToGroup', group, randomName);


            //attach on listeners here so they stay alive in callstack

            //when receiving transferred message from server
            connection.on("MessageToGroup", (user, message, avatarURL) => {
                dispatch(addComment(message, user, avatarURL));
            })

            connection.on('ServerMessageOnConnected', (connectionId) => {
                // dispatch(addComment(`${text} ${randomName}!`));
                //save user related data to redux store
                //have it persist for the client's life
                dispatch(addUser(connectionId, randomName, avatarURL,group))

            })

            connection.on('ServerMessageOnConnectedToGroup', text => {
                dispatch(addComment(`${text}`));

            })

            connection.on('ServerMessageOnDisconnected', text => {
                dispatch(addComment(`${text}!`));
            })

            connection.on('ServerToGroup', userName => {
                dispatch(addComment(`${userName} has joined the group!`));
            })
        })
    }
}

//call server to add user to group
export const addToGroup = (groupName,userName) => {
    return (dispatch, getState) => {
        getState().client.connection.invoke('AddToGroup', groupName, userName);
    }
}

export const setGroup = (group) => ({
    type: 'SET_GROUP',
    group
})

export const sendToHub = (text, userName, avatarURL, group) => {
    return (dispatch, getState) => {
        getState().client.connection.invoke('SendMessageToGroup',text, userName, avatarURL, group)
    }
}

export const sendToHubGroup = (group, text) => {
    return (dispatch, getState) => {
        getState.client.connection.invoke('SendGroupMessage', group, text);
    }
}
