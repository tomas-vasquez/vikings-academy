


export default (state = [], action) => {

    if (action.type === 'SET_USERS') {

        return [...state, ...action.data];

    } else if (action.type === 'REPLACE_USERS') {

        return [...action.data];

    } else if (action.type === 'CONSIGN_PRODUCT') {

        let new_state = state;
        // eslint-disable-next-line
        state.map((user, index) => {
            if (user.id === action.data.user_id) {
                if (user.products === 'none') {
                    user.products = action.data.product
                } else {
                    user.products = user.products + " " + action.data.product;
                }
            }
            new_state[index] = user;
        });
        return [...new_state];

    } else if (action.type === 'RESET') {

        return [];
    }

    return state;
}