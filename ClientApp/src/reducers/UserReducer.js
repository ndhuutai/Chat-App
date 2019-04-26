const defaultState = {
    userName: '',
    connectionId: '',
    avatarURL: '',
    group: '',
    gender: ''
}

export default (state = defaultState, action) => {
    switch(action.type) {
        case 'ADD_USER':
        return {
            ...state,
            userName: action.userName,
            avatarURL: action. avatarURL,
            connectionId: action.connectionId,
            group: action.group,
            gender: action.gender
        }
        case 'SET_GROUP':
        return {
            ...state,
            group: action.group
        }
        case 'SET_GENDER':
        return {
            ...state,
            gender: action.gender
        }
        default: 
        return state;
    }
}