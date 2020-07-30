export const addDomFile = (domUrl, data) => ({
  type: "ADD_DOM_FILE",
  domUrl,
  data,
});

export const replacePlatformData = (data) => ({
  type: "REPLACE_PLATFORM_DATA",
  data,
});
export const replaceRemoteStorage = (data) => ({
  type: "REPLACE_REMOTE_STORAGE",
  data,
});
