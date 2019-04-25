const defaultState = {
    userName: '',
    connectionId: ''
}

export default (state = defaultState, action) => {
    switch(action.type) {
        case 'ADD_USER':
        return {
            ...state,
            userName: action.userName,
            connectionId: action.connectionId
        }
        default: 
        return state;
    }
}