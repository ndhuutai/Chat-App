import axios from 'axios';

const url = '/api/usergroups/group';

export const setGroupId = (id) => ({
    type: 'SET_GROUP_ID',
    id
});


export const setGroupName = (groupName) => ({
    type: 'SET_GROUP_NAME',
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


export const startSetGroup = ({id}) => {
    return async (dispatch, getState) => {
        const {data} = await axios.get(`${url}/${id}`);
        console.log(data);
        dispatch(setUsersInGroup(data));
    }
};
