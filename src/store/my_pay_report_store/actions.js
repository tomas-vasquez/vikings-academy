
export const addMyPayReport = data => ({
    type: 'ADD_MY_PAY_REPORT',
    data
});


export const replaceMyPayReport = data => ({
    type: 'REPLACE_MY_PAY_REPORT',
    data
});

export const deleteMyPayReport = data => ({
    type: 'DELETE_MY_PAY_REPORT',
    id: data
});