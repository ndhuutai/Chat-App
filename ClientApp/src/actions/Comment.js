import moment from 'moment';



export const addComment = (text, user = 'ADMIN', avatarURL) => ({
    type: 'ADD_COMMENT',
    text,
    user,
    avatarURL,
    createdAt: moment().valueOf()
})

export const wipeComments = () => ({
    type: 'WIPE_COMMENTS',
})

