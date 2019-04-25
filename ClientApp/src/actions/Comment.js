import moment from 'moment';



export const addComment = (text, user = 'Admin') => ({
    type: 'ADD_COMMENT',
    text,
    user,
    createdAt: moment().valueOf()
})

export const sendToHub = (text, userName) => {
    return async (dispatch, getState) => {
        getState().client.connection.invoke('SendMessage', userName, text)
    }
}

export const sendToHubGroup = (text) => {
    return (dispatch, getState) => {
        getState.client.connection.invoke('SendGroupMessage', 'testGroup', text);
    }
}

