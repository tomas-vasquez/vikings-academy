import Controller_admin from ".././_controllers";
import Model_Users from "_models/Users";

import Logger from "helpers/Logger";

import store from "store";

import Alerts from "helpers/Alerts";
// import { replace } from "connected-react-router";
// import { reset } from "store/app_store/actions";
// import DB from "helpers/db";
// import {myRoutes} from "config";
import { replaceUsers } from "store/users_store/actions";

class Controller_Users extends Controller_admin {
  constructor() {
    super();
    this.users = new Model_Users();
    this.alerts = new Alerts();
    this.log = new Logger("Controller_Users", "background:blue;color:white");
  }

  /*!
    =========================================================
    * 
    =========================================================
    */

  // addProspect(form) {

  //     this.log.msg("añadiendo prospecto...");
  //     this.alerts.showLoading();

  //     try {
  //         this.users.addProspect(form, (api_token, parent) => {

  //             this.alerts.showLoading(false);

  //             this.db.set("api-token", api_token);
  //             this.db.set("prospect_name", document.getElementById("input-name").value);
  //             this.db.set("prospect_email", document.getElementById("input-email").value);

  //             store.dispatch(replace(routes.landing2 + "/@" + parent));
  //             this.log.msg("añadiendo prospecto... Perfecto !!! \n");

  //         }, msg => {

  //             //no se pudo iniciar sesion
  //             if (msg === "error-param") {
  //                 this.alerts.showAlert("Revise los datos ingresados");

  //             } else if (msg === "error-already-exist-email") {
  //                 this.alerts.showAlert("Ingrese otro correo...", "Correo electrónico ya registrado!", true, e => {
  //                     document.getElementById("input-email").focus();
  //                 });
  //             }
  //             this.log.msg("añadiendo prospecto... Falló !!!: " + msg + "\n");

  //         });

  //     } catch (error) {
  //         this.log.msg("añadiendo prospecto... ERROR !!!: " + error + "\n");
  //         this.errorsHandler(error);
  //     }
  // }

  /*!
    =========================================================
    * 
    =========================================================
    */

  register = (form, _callback) => {
    this.alerts.showLoading();
    this.log.msg("registrando...");

    let data = {};

    for (let index = 0; index < form.length; index++) {
      if (form[index].name) {
        data[form[index].name] = form[index].value;
        if (form[index].name === "accept_the_terms") {
          data[form[index].name] = form[index].checked;
        }
      }
    }

    if (data.accept_the_terms) {
      data.accept_the_terms = undefined;

      this.users.register(
        data,
        (response) => {
          this.alerts.showSuccess("Espere...", "Perfecto!!!");
          this.log.msg("registrando... Perfecto !!! \n");

          this.db.set("api-token", response.data.api_token);

          //ejecutamos el callback
          if (_callback !== undefined) _callback();
        },
        (error) =>
          this.errorsHandler(error, () => this.register(form, _callback))
      );
    } else {
      return this.alerts.showAlert(
        "No aceptó nuestros términos y condiciones de uso",
        "Espere...",
        true,
        (e) => {
          document.getElementById("customCheckRegister").focus();
        }
      );
    }
  };

  /*!
    =========================================================
    * 
    =========================================================
    */

  login = (form, _callback) => {
    this.alerts.showLoading();
    this.log.msg("logeando...");

    let data = {};

    for (let index = 0; index < form.length; index++) {
      if (form[index].name) {
        data[form[index].name] = form[index].value;
        if (form[index].name === "remember_token")
          data[form[index].name] = form[index].checked;
      }
    }

    this.users.login(
      data,
      (response) => {
        this.alerts.showSuccess("Espere...", "Perfecto!!!");

        store.log();

        this.db.set("api-token", response.data.api_token);

        this.log.msg("logeando... Perfecto !!! \n");

        //ejecutamos el callback
        if (_callback !== undefined) _callback();
      },
      (error) => this.errorsHandler(error, () => this.login(form, _callback))
    );
  };

  /*!
    =========================================================
    * 
    =========================================================
    */

  logout = () => {
    this.log.msg("Cerrando sessión... ");

    this.alerts.showConfirm(
      "esta seguro?",
      "Cerrando sesión",
      true,
      () => {
        this.unsafeLogout();
      },
      () => {
        this.log.msg("Cerrando sessión... cancelado! :D\n");
      }
    );
  };

  unsafeLogout = () => {
    this.alerts.showLoading();
    this.log.msg("logeando...");

    this.users.logout(
      () => {
        this.alerts.showSuccess("Hasta luego...", "Sesión cerrada ");
        this.clearData();
      },
      (error) => this.errorsHandler(error, () => this.unsafeLogout())
    );
  };

  /*!
    =========================================================
    * 
    =========================================================
    */

  get_user_data = (id, _callback) => {
    // this.alerts.showLoading();
    this.log.msg("Cargando datos de usuario");

    this.users.get_user_data(
      id,
      (response) => {
        let userData = store.getState().users.map((user) => {
          if (user.id === id) {
            return (user.profile = response.data.data);
          }
          return user;
        });

        store.dispatch(replaceUsers(userData));
        store.log();
        this.log.msg("logeando... Perfecto !!! \n");

        //ejecutamos el callback
        if (_callback !== undefined) _callback();
      },
      (error) =>
        this.errorsHandler(error, () => this.get_user_data(id, _callback))
    );
  };
}

export default Controller_Users;
