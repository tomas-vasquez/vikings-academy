export const setItems = (course_name, items) => ({
  type: "SET_ITEMS",
  course_name,
  items,
});

export const setCourses = (data) => ({
  type: "SET_COURSES",
  data,
});
export const setAuthors = (data) => ({
  type: "SET_AUTHORS",
  data,
});


export const setDescription = (target,data) => ({
  type: "SET_DESCRIPTION",
  target,
  data,
});

