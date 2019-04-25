const defaultState = {
    connection: undefined,
    group: ''
}

export default (state = defaultState, action) => {
    switch(action.type) {
        case 'SET_CONNECTION':
        return {
            ...state,
            connection: action.connection
        }
        case 'SET_GROUP':
        return {
            ...state,
            group: action.group
        }
        default:
        return state;
    }
}