const initialValues = {
  user_name: "",
  email: "",
  name: "",
  code_area: "",
  wasap: "",
  feisbuk: "",
  pic_url: "",
  description: "",
  
  pay_methods: [],
}

export default (state = initialValues, action) => {

  if (action.type === 'SET_PARENTDATA') {
    return { ...state, ...action.data };

  } else if (action.type === 'REPLACE_PARENTDATA') {
    return {  ...action.data };

  } else if (action.type === 'RESET') {
    return initialValues;
  }

  return state;
}