import Login from "views/forms/Login";
import Dashboard from "views/Dashboard";
import { myRoutes } from "config";

import UserProfile from "views/UserProfile";
import FormRegister from "views/forms/register";
import Courses from "views/AllCourses"

var routes = [
  {
    path: myRoutes.register,
    name: "Registro de usuarios",
    icon: "tim-icons icon-chart-pie-36",
    component: FormRegister,
    layout: "auth",
  },
  {
    path: myRoutes.login,
    name: "iniciar Sesion",
    icon: "tim-icons icon-chart-pie-36",
    component: Login,
    layout: "auth",
  },
  /////////////////////////////////////
  {
    path: myRoutes.home,
    name: "Inicio",
    icon: "fa fa-home",
    component: Dashboard,
    layout: "admin",
  },
  {
    path: myRoutes.profile,
    name: "Tu perfil",
    icon: "fa fa-user-graduate",
    component: UserProfile,
    layout: "admin",
  },
  {
    path: myRoutes.courses,
    name: "cursos",
    icon: "fa fa-graduation-cap",
    component: Courses,
    layout: "admin",
  },
];
export default routes;
