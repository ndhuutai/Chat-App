export const addUser = (connectionId, userName , avatarURL , group, gender) => ({
    type: 'ADD_USER',
    connectionId,
    userName,
    avatarURL,
    group,
    gender,
})

export const setGroup = (group) => ({
    type:'SET_GROUP',
    group
})

export const setGender= (gender) => ({
    type: 'SET_GENDER',
    gender
});