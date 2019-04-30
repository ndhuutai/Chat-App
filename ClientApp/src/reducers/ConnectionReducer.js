const defaultState = {
    connection: undefined
}

export default (state = defaultState, action) => {
    switch(action.type) {
        case 'SET_CONNECTION':
        return {
            ...state,
            connection: action.connection
        };
        default:
        return state;
    }
}