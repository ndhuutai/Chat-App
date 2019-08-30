const defaultState = {
    userName: '',
    connectionId: '',
    avatarURL: '',
    groupName: '',
    groups: [],
    gender: '',
    id: ''
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return {
                ...state,
                userName: action.userName,
                avatarURL: action.avatarURL,
                connectionId: action.connectionId,
                groupName: action.groupName,
                gender: action.gender,
                id: action.id
            };
        case 'SET_USER_NAME':
            return {
                ...state,
                userName: action.userName
            };
        case 'SET_GROUP':
            return {
                ...state,
                groupName: action.groupName
            };
        case 'SET_JOINED_GROUPS':
            return {
                ...state,
                groups: action.groups
            };
        case 'SET_GENDER':
            return {
                ...state,
                gender: action.gender
            };
        case 'SET_SUB':
            return {
                ...state,
                sub: action.sub
            };
        case 'SET_AUTHENTICATED':
            return {
                ...state,
                isAuthenticated: action.isAuthenticated
            };
        default:
            return state;
    }
}