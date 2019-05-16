import axios from 'axios';
import moment from 'moment'
import { addComment } from './Comment';
import { addUser, setUID } from './User';


export const setConnection = (connection) => ({
    type: 'SET_CONNECTION',
    connection
});

export const startSetConnection = (connection, randomName, avatarURL, group, gender) => {
    return (dispatch, getState) => {
        //start(open) the connection before setting in redux store
        connection.start().then(() => {
            
            //set connection in redux store
            dispatch(setConnection(connection));
            
            //add user to group right away
            connection.invoke('AddUserToDb', group, randomName, avatarURL, gender);

            //when receiving transferred message from server
            connection.on("MessageToGroup", (userName, message, avatarURL) => {

                //todo: add comment to database with uid from user to associate
                axios.post('/api/comments', {
                    Text: message,
                    CreatedAt: moment().utc(),
                    AvatarUrl: avatarURL,
                    UserId: getState().user.uid
                }).then(response => {
                    console.log(response);
                }).catch(err => {
                    console.log(err)
                });

                dispatch(addComment(message, userName, avatarURL));
            });

            //when user connect to a group
            connection.on('ServerMessageOnConnected', (connectionId) => {
                // let userId = undefined;
                // console.log(gender);
                // //todo:add user to database using axios calling web api
                // axios.post('/api/users', {
                //     UserName: randomName,
                //     AvatarUrl: avatarURL,
                //     ConnectionId: connectionId,
                //     Gender: gender,
                //     Group: group
                // }).then(response => {
                //     userId = response.data.id;
                //     dispatch(addUser(userId, connectionId, randomName, avatarURL,group, gender))
                // }).catch(err => {
                //     console.log(err)
                // });

                dispatch(addUser(connectionId, randomName, avatarURL,group, gender))
            });

            connection.on('OnAddedToDb', id => {
                console.log("added to db");
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
export const addToGroup = (groupName,userName) => {
    return (dispatch, getState) => {
        getState().client.connection.invoke('AddToGroup', groupName, userName);
    }
};

export const setGroup = (group) => ({
    type: 'SET_GROUP',
    group
});

export const sendToHub = (text, userName, avatarURL, group) => {
    return (dispatch, getState) => {
        getState().client.connection.invoke('SendMessageToGroup',text, userName, avatarURL, group, moment().utc())
    }
};
