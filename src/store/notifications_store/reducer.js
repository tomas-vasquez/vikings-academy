


export default (state = [], action) => {

    if(action.type === 'SET_NOTIFICATIONS'){
        return [...state, ...action.data];
    } else if(action.type === 'REPLACE_NOTIFICATIONS'){
        return [ ...action.data];
    } else if (action.type === 'RESET') {
        return []; 
    }

    return state;
}