import axios from 'axios';

const url = '/api/usergroups/group';
const url2 = '/api/users';


// ---------synchronous action creators ------------//
export const setGroupId = (id) => ({
    type: 'SET_GROUP_ID',
    id
});

export const setPrivate = (isPrivate) => ({
    type: 'SET_PRIVATE',
    isPrivate
})


export const setGroupName = (groupName) => ({
    type: 'SET_GROUP_NAME',
    groupName
});

export const setAlternativeName = (alternativeName) => ({
    type: 'SET_ALTERNATIVE_NAME',
    alternativeName
});

//to be called by async action startSetGroup once data comes back
export const setUsersInGroup = (users) => ({
    type: 'SET_USERS',
    users
});

export const addUserToGroup = (user) => ({
    type: 'ADD_USER_TO_GROUP',
    user
});

export const removeUserFromGroup = (user) => ({
    type: 'REMOVE_USER',
    user
});

// ----------- asynchronous action creators---------------//


//querying data from web api to get all users for a given groupId
export const startSetUsersInGroup = ({groupId}) => {
    return async (dispatch, getState) => {
        const {data} = await axios.get(`${url}/${groupId}`);
        dispatch(setUsersInGroup(data));
    }
};


export const startSetAlternativeName = (alternativeName) => {
    return async (dispatch, getState) => {
        
    }
};