const init = {
  courses: [],
  items: [],
  descriptions: [],
};

export default (state = init, action) => {
  ///
  if (action.type === "SET_COURSES") {
    let aux2 = state;
    aux2.courses = [...action.data];
    return aux2;
    ///
  } else if (action.type === "SET_ITEMS") {
    let aux2 = state;
    aux2.items[action.course_name] = action.items;
    return aux2;
    ///
  } else if (action.type === "SET_AUTHORS") {
    let aux2 = state;
    aux2.authors = [...action.data];
    return aux2;
  } else if (action.type === "SET_DESCRIPTION") {
    let aux2 = state;
    aux2.descriptions[action.target] = action.data;
    return aux2;
  }

  return state;
};
