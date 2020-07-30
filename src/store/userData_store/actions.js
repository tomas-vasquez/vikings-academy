
export const setUserData = data => ({
    type: 'SET_USERDATA',
    data
});

export const replaceUserData = data => ({
    type: 'REPLACE_USERDATA',
    data
});



export const addMyPayMethod = data => ({
    type: 'ADD_MY_PAY_METHOD',
    data
});

export const replacePayMethodsTemplates = (country, data) => ({
    type: 'REPLACE_PAY_METHODS_TEMPLATES',
    country,
    data
});