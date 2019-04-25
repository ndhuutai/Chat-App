export const addUser = (connectionId, userName) => ({
    type: 'ADD_USER',
    connectionId,
    userName
})