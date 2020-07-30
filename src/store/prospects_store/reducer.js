


export default (state = [], action) => {

    if(action.type === 'SET_PROSPECTS'){
        return [...state, ...action.data];
    } else if(action.type === 'REPLACE_PROSPECTS'){
        return [ ...action.data];
    } else if (action.type === 'RESET') {
        return []; 
    }

    return state;
}