export const addUser = (id, connectionId, userName , avatarURL, groupName, gender) => ({
    type: 'ADD_USER',
    connectionId,
    userName,
    avatarURL,
    groupName,
    gender,
    id
});

export const setConnectionId = (connectionId) => ({
    type: 'SET_CONNECTION',
    connectionId
})

export const setGroup = (groupName) => ({
    type:'SET_GROUP',
    groupName
});

export const setJoinedGroups = (groups) => ({
    type: 'SET_JOINED_GROUPS',
    groups
});

export const setGender= (gender) => ({
    type: 'SET_GENDER',
    gender
});

export const setUID = (id) => ({
    type: 'SET_ID',
    id
});