const defaultState = [];

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_COMMENT':
            return [
                ...state,
                {
                    text: action.text,
                    createdAt: action.createdAt
                }
            ]
        default:
            return state;
    }
}