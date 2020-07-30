// export const serverUrl = "http://192.168.43.85";
export const serverUrl = "http://localhost";

export const apiUrl = serverUrl + "/api/v1";
export const appUrl = serverUrl + "/app";
export const storageUrl = serverUrl + "/storage/";
export const reportsUrl = serverUrl + "/storage/pay_reports";
export const academyMediaUrl = serverUrl + "/storage/academy";
export const blogUrl = serverUrl + "/storage/blog/";
export const flagsUrl = serverUrl + "/storage/flags/";
export const mediaUrl = serverUrl + "/storage/media";
export const pay_methodsUrl = serverUrl + "/storage/pay_methods";

export const basenameOffice = "/academia";
export const basenameAuth = "/auth";

export const myRoutes = {
  home: "/",
  profile: "/miperfil",

  courses: "/cursos",
  course: "/curso",

  //appp

  landing1: "/inicio",

  movie1: "/video",
  landing2: "/inicio2",
  doc1: "/terminos_y_condiciones",
  blog: "/blog",

  //academia

  admin: "/academia",
  auth: "/auth",

  login: "/acceso",
  register: "/registro",

  activation: basenameOffice + "/activation",

  usersLevel1: basenameOffice + "/usuarios",
  platformettings: basenameOffice + "/configuraciones",
  usersLevel3: basenameOffice + "/ventas",

  academyLevel1: basenameOffice + "/academia",
  academyLevel2: basenameOffice + "/academia-master",
  academyLevel3: basenameOffice + "/academia-profesional",

  editorBlog: basenameOffice + "/crear-blog",
};
