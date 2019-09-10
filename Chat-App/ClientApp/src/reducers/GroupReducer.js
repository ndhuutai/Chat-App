const initialState = {
    id: '',
    name: '',
    users: '',
    isPrivate: false
};


export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_GROUP_ID':
            return {
                ...state,
                id: action.id
            };
        case 'SET_GROUP_NAME':
            return {
                ...state,
                name: action.groupName
            };
        case 'SET_PRIVATE':
            return {
                ...state,
                isPrivate: action.isPrivate
            };
        case 'SET_USERS':
            return {
                ...state,
                users: action.users
            };
        case 'ADD_USER_TO_GROUP':
            return {
                ...state,
                users: [...state.users, action.user]
            };
        case 'REMOVE_USER':
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.user.id)
            };
        default:
            return state;
            
    }
};