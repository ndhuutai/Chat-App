export const addUser = (uid, connectionId, userName , avatarURL, group, gender) => ({
    type: 'ADD_USER',
    connectionId,
    userName,
    avatarURL,
    group,
    gender,
    uid
});

export const setGroup = (group) => ({
    type:'SET_GROUP',
    group
});

export const setGender= (gender) => ({
    type: 'SET_GENDER',
    gender
});

export const setUID = (uid) => ({
    type: 'SET_UID',
    uid
});