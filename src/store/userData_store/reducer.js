const init = {
    user_name: "",
    email: "",
    pic_url:"",
    
    name: "",
    flag:"BO",
    code_area: "591",
    description: "",
    parent_id: "",

    pay_methods: [],
    pay_methods_templates: [],
}

export default (state = init, action) => {

    var aux;

    if (action.type === 'SET_USERDATA') {
        return { ...state, ...action.data };

    } else if (action.type === 'REPLACE_USERDATA') {
        return { ...action.data };

    } else if (action.type === 'ADD_MY_PAY_METHOD') {
        aux = state;
        aux.pay_methods.push(action.data);
        return aux;

    } else if (action.type === 'REPLACE_PAY_METHODS_TEMPLATES') {
        aux = state;
        aux.pay_methods_templates[action.country] = action.data;
        return aux;

    } else if (action.type === 'RESET') {
        return init;
        
    }

    return state;
}