const initialState = {
    name: '',
    users: []
};


export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_GROUP':
            return {
                ...state,
                name: action.group
            };
        case 'ADD_USER':
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