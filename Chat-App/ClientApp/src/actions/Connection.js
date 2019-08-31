import moment from 'moment'
import {addComment} from './Comment';
import {addUser, startSetJoinedGroups} from './User';
import {setGroupName, setGroupId, startSetGroup} from "./Group";


export const setConnection = (connection) => ({
    type: 'SET_CONNECTION',
    connection
});

//when a new message is sent to the current group
function onMessageToGroup({connection, dispatch}) {
    connection.on("MessageToGroup", ({userName, text, avatarUrl}) => {
        dispatch(addComment(text, userName, avatarUrl));
    });
}

//when user has been added to db
function onAddedToDb({connection, dispatch}) {
    connection.on('OnAddedToDb', ({id, userName, avatarUrl, groupName = 'default', gender, sub}) => {
        dispatch(addUser(id, userName, avatarUrl, groupName, gender, sub));
        dispatch(addToGroup(groupName, id))
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
    connection.on('ServerDataOnConnectedToGroup', ({groupId, name, id}) => {
        dispatch(setGroupId(groupId));
        dispatch(setGroupName(name));
        dispatch(startSetGroup({groupId}));
        dispatch(startSetJoinedGroups({id}));
    })
}

export const startSetConnection = (connection, userName, avatarURL, gender, groupName, sub) => {

    return (dispatch, getState) => {

        const eventListeners = composeListeners(
            onMessageToGroup,
            onAddedToDb,
            onServerMessageOnConnectedToGroup,
            onServerMessageOnDisconnected,
            onServerToGroup,
            onServerDataOnConnectedToGroup
        );

        eventListeners({connection, dispatch});


        connection.start().then(() => {
            dispatch(setConnection(connection));
            //add user to groupName right away
            connection.invoke('AddUserToDb', {userName, avatarURL, gender, sub}, groupName);

        }).catch(error => console.log(error));

    }
};

//call server to add user to groupName
export const addToGroup = (groupName, id) => {
    return (dispatch, getState) => {
        getState().client.connection.invoke('AddToGroup', {groupName, id, gender: getState().user.gender}); //user state
    }
};

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

const composeListeners = (...functions) =>
    (arg) =>
        functions.reduce((composed, f) => {
            f(composed);
            return composed;
        }, arg);
