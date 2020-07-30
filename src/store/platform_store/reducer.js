const initState = {
  platformData: {},
  pagines: [],
  remoteStorage: null,
};

export default (state = initState, action) => {
  if (action.type === "REPLACE_PLATFORM_DATA") {
    let aux = state;
    aux.platformData = action.data;
    return aux;
    //
  } else if (action.type === "ADD_DOM_FILE") {
    let aux = state;
    aux.pagines[action.domUrl] = action.data;
    return aux;
  } else if (action.type === "REPLACE_REMOTE_STORAGE") {
    let aux = state;
    aux.remoteStorage = action.data;
    return aux;
  }
  return state;
};
