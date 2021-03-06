import moment from 'moment'
import {addComment} from './Comment';
import {addUser, startSetJoinedGroups} from './User';
import {setGroupName, setGroupId, startSetUsersInGroup, setPrivate} from "./Group";

//-------------Listeners for events raised by chat hub server. -------------//

//when a new message is sent to the current group
function onMessageToGroup({connection, dispatch}) {
    connection.on("MessageToGroup", ({userName, text, avatarUrl}) => {
        dispatch(addComment(text, userName, avatarUrl));
    });
}

//when user has been added to db
function onAddedToDb({connection, dispatch}) {
    connection.on('OnAddedToDb', ({id, userName, avatarUrl, gender, sub}) => {
        dispatch(addUser(id, userName, avatarUrl, gender, sub));
        dispatch(addToGroup('default', id))
    });
}

//server message from admin to the calling user when user connects to group
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

//server notification to group when new user connects
function onServerToGroup({connection, dispatch}) {
    connection.on('ServerToGroup', userName => {
        dispatch(addComment(`${userName} has joined the group!`));
    });
}

//when user connected to a group, data is sent back from server containing group info
function onServerDataOnConnectedToGroup({connection, dispatch}) {
    connection.on('ServerDataOnConnectedToGroup', ({groupId, name, id, isPrivate}) => {
        //setting group state (redux)
        console.log(name);
        dispatch(setGroupId(groupId));
        dispatch(setGroupName(name));
        dispatch(setPrivate(isPrivate));
        dispatch(startSetUsersInGroup({groupId}));
        
        //setting user state (redux)
        dispatch(startSetJoinedGroups({id}));
    })
}

const onPrivateGroupData = ({connection, dispatch}) => {
    connection.on('PrivateGroupData',({privateGroupName, privateGroupId, senderId, receiverId}) => {
        //dispatch a request to add to group
        //the receiver is now the sender on this end, and vice versa
        console.log('private group data being called');
        connection.invoke("AddToPrivateGroup", {groupName: privateGroupName, senderId : receiverId, receiverId : senderId})
    })    
};

const onPrivateMessage = ({connection, dispatch}) => {
    connection.on("PrivateMessage", ({}))
}

//-------------synchronous action creators------------------//

//setting connection for the redux state
export const setConnection = (connection) => ({
    type: 'SET_CONNECTION',
    connection
});


//-------------asynchronous action creators------------------//


//starting the built connection and registering event listeners
export const startSetConnection = (connection, userName, avatarURL, gender, groupName, sub) => {

    return (dispatch, getState) => {

        //composing function that passes the started connection and dispatch, through all functions in the arguments
        //the listeners for the client doesn't need the connection state to be "on" in order to register them.
        const eventListeners = composeListeners(
            onMessageToGroup,
            onAddedToDb,
            onServerMessageOnConnectedToGroup,
            onServerMessageOnDisconnected,
            onServerToGroup,
            onServerDataOnConnectedToGroup,
            onPrivateGroupData
        );

        eventListeners({connection, dispatch});

        //starting the connection to connect with chat hub server
        connection.start().then(() => {
            //setting the started connection to its corresponding state
            //connection state has to be "on" in order to invoke functions on chat hub
            dispatch(setConnection(connection));
            //add user to groupName right away
            connection.invoke('AddUserToDb', {userName, avatarURL, gender, sub}, 'default');

        }).catch(error => console.log(error));

    }
};

//call server to add user to groupName
export const addToGroup = (groupName, id) => {
    return (dispatch, getState) => {
        getState().client.connection.invoke('AddToGroup', {groupName, id, gender: getState().user.gender}); //user state
    }
};

export const addToPrivateGroup = (groupName, senderId, receiverId) => {
    return (dispatch, getState) => {
        getState().client.connection.invoke('AddToPrivateGroup', {groupName,senderId, receiverId});
    }
};

export const sendPrivateMessage = (text, receiverSub, senderSub, privateGroupName) => {
    return (dispatch, getState) => {
        const {client, user} = getState();
        client.connection.invoke("SendPrivateMessage", {message: text, receiverSub, senderSub, privateGroupName});
        //dispatching to add a comment here since sending private message only send to the receiver and doesn't
        //add a comment to show on the sender's end
        dispatch(addComment(text, user.userName,user.avatarURL, moment().utc()));
    }
}

//send a message to hub
export const sendToHub = (text, userName, avatarURL, groupName) => {
    return (dispatch, getState) => {
        getState().client.connection.invoke('SendMessageToGroup', {
            userId: getState().user.id,
            text,
            userName,
            avatarURL,
            groupName,
            createdAt: moment().utc()
        }) // user state + comment text
    }
};

//reducer function to help with managing complexity and readability of registering chat hub's event listeners.
const composeListeners = (...functions) =>
    (arg) =>
        functions.reduce((composed, f) => {
            f(composed);
            return composed;
        }, arg);
