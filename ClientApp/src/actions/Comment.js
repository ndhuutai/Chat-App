import moment from 'moment';
import { generate_avatar } from 'cartoon-avatar';



export const addComment = (text, user = 'Admin', avatarURL = generate_avatar()) => ({
    type: 'ADD_COMMENT',
    text,
    user,
    avatarURL,
    createdAt: moment().valueOf()
})

export const sendToHub = (text, userName, avatarURL) => {
    return async (dispatch, getState) => {
        getState().client.connection.invoke('SendMessage',text, userName, avatarURL)
    }
}

export const sendToHubGroup = (text) => {
    return (dispatch, getState) => {
        getState.client.connection.invoke('SendGroupMessage', 'testGroup', text);
    }
}

