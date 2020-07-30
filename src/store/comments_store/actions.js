
export const replaceComments = (item_id, data) => ({
    type: 'REPLACE_COMMENTS',
    item_id,
    data
});

export const addComment = (item_id,  comment) => ({
    type: 'ADD_COMMENT',
    item_id,
    comment
});

export const setLastUpdate = (item_id,  lastUpdate) => ({
    type: 'SET_LAST_UPDATE',
    item_id,
    lastUpdate
});
