import axios from 'axios';

const url = '/api/usergroups/user';

export const addUser = (id, connectionId, userName , avatarURL, groupName, gender, sub) => ({
    type: 'ADD_USER',
    connectionId,
    userName,
    avatarURL,
    groupName,
    gender,
    id,
    sub
});

export const setConnectionId = (connectionId) => ({
    type: 'SET_CONNECTION',
    connectionId
});

export const setUserName = userName => ({
    type: "SET_USER_NAME",
    userName
});

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

export const setSub = (sub) => ({
    type: 'SET_SUB',
    sub
});

export const setAuthenticated = (isAuthenticated) => ({
    type: 'SET_AUTHENTICATED',
    isAuthenticated
});

export const startSetJoinedGroups = ({id}) => {
    return async (dispatch, getState) => {
        let {data} = await axios.get(`${url}/${id}`);
        dispatch(setJoinedGroups(data));
    }
};