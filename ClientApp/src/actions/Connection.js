import { addComment } from './Comment';
import { addUser } from './User';

export const setConnection = (connection) => ({
    type: 'SET_CONNECTION',
    connection
})

export const startSetConnection = (connection, randomName) => {
    return (dispatch, getState) => {
        //start(open) the connection before setting in redux store
        connection.start().then(() => {
            
            //set connection in redux store
            dispatch(setConnection(connection));

            //attach on listeners here so they stay alive in callstack
            getState().client.connection.on("ReceiveMessage", (message) => {
                dispatch(addComment(message));
            })

            getState().client.connection.on('ServerMessage', (connectionId, text) => {
                dispatch(addComment(`${text} ${randomName}!`));
                dispatch(addUser(connectionId,randomName))
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
