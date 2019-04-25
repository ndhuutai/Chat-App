const defaultState = [];

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_COMMENT':
            return [
                ...state,
                {
                    text: action.text,
                    user: action.user,
                    createdAt: action.createdAt
                }
            ]
        default:
            return state;
    }
}