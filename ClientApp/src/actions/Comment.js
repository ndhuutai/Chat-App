import moment from 'moment';



export const addComment = (text, user) => ({
    type: 'ADD_COMMENT',
    text,
    user,
    createdAt: moment().valueOf()
})

export const sendToHub = (text) => {
    return async (dispatch, getState) => {
        getState().client.connection.invoke('SendMessage', 'test', text)
    }
}

export const sendToHubGroup = (text) => {
    return (dispatch, getState) => {
        getState.client.connection.invoke('SendGroupMessage', 'testGroup', text);
    }
}

