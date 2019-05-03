const defaultState = {
    userName: '',
    connectionId: '',
    avatarURL: '',
    group: '',
    gender: '',
    uid:''
};

export default (state = defaultState, action) => {
    switch(action.type) {
        case 'ADD_USER':
        return {
            ...state,
            userName: action.userName,
            avatarURL: action.avatarURL,
            connectionId: action.connectionId,
            group: action.group,
            gender: action.gender,
            uid: action.uid
        };
        case 'SET_GROUP':
        return {
            ...state,
            group: action.group
        };
        case 'SET_GENDER':
        return {
            ...state,
            gender: action.gender
        };
        case 'SET_UID':
            return {
                ...state,
                uid: action.uid
            };
        default: 
        return state;
    }
}