const defaultState = [];

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_COMMENT':
            return [
                ...state,
                {
                    text: action.text,
                    user: action.user,
                    avatarURL: action.avatarURL,
                    createdAt: action.createdAt
                }
            ]
        case 'WIPE_COMMENTS':
            return [];
        default:
            return state;
    }
}