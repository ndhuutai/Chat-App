import { addComment } from './Comment';
import { addUser } from './User';

export const setConnection = (connection) => ({
    type: 'SET_CONNECTION',
    connection
})

export const startSetConnection = (connection, randomName, avatarURL) => {
    return (dispatch, getState) => {
        //start(open) the connection before setting in redux store
        connection.start().then(() => {
            
            //set connection in redux store
            dispatch(setConnection(connection));

            //attach on listeners here so they stay alive in callstack

            //when receiving transferred message from server
            getState().client.connection.on("ReceiveMessage", (user, message, avatarURL) => {
                dispatch(addComment(message, user, avatarURL));
            })

            getState().client.connection.on('ServerMessage', (connectionId, text) => {
                dispatch(addComment(`${text} ${randomName}!`));
                //save user related data to redux store
                //have it persist for the client's life
                dispatch(addUser(connectionId, randomName, avatarURL))
            })

            getState().client.connection.on('ServerToGroup', userName => {
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
