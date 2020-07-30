
export const setUsers = data => ({
    type: 'SET_USERS',
    data
});

export const replaceUsers = data => ({
    type: 'REPLACE_USERS',
    data
});

export const consignProduct = (user_id, product) => ({
    type: 'CONSIGN_PRODUCT',
    data: { user_id, product }
});