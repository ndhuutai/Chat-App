
export const addComment = (text, user = 'ADMIN', avatarURL, createdAt) => ({
    type: 'ADD_COMMENT',
    text,
    user,
    avatarURL,
    createdAt
});

export const wipeComments = () => ({
    type: 'WIPE_COMMENTS',
});

