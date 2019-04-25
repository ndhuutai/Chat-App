export const addUser = (connectionId, userName , avatarURL) => ({
    type: 'ADD_USER',
    connectionId,
    userName,
    avatarURL
})