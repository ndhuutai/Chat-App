import axios from 'axios';
const url = '/api/usergroups/group';


export const setGroup = (groupName) => ({
    type: 'SET_GROUP',
    groupName
});

export const setUsersInGroup = (users) => ({
    type: 'SET_USERS',
    users
});

export const addUserToGroup = (user) => ({
    type: 'ADD_USER',
    user
});

export const removeUserFromGroup = (user) => ({
    type: 'REMOVE_USER',
    user
});


export const startSetGroup = ({id})  => {
    return async (dispatch, getState) => {
        const { data } = await axios.get(url, {
            params: {
                id
            }
        });
        
        dispatch(setGroup())
    }
};
