//helpers
import Logger from "helpers/Logger";
import Alerts from "helpers/Alerts";
import DB from "helpers/db";

//store
import store from "store";
import { isBeenLoadedMainData } from "store/app_store/actions";
import { replace } from "connected-react-router/lib/actions";
import { setUserData } from "store/userData_store/actions";
import { setParentData } from "store/parentData_store/actions";
import { setUsers } from "store/users_store/actions";
import { replacePayReports } from "store/pay_reports_store/actions";
import { setItems } from "store/academy_store/actions";

//models
import Model_admin from "_models";

//config
import {myRoutes} from "config";
import { reset } from "store/app_store/actions";
import { replacePlatformData } from "store/platform_store/actions";

class Controller_admin {
  constructor() {
    this.log = new Logger("Controller_admin", "background:blue;color:white");
    this.alerts = new Alerts();
    this.db = new DB();
    this.modeladmin = new Model_admin();
  }

  /*!
  =========================================================
  * 
  =========================================================
  */

  initApp(ref) {
    // alert("hola");
    if (!store.getState().app.isBeenLoadedMainData) {
      this.alerts.showLoading(true, "Cargando...");
      this.log.msg("cargando datos del usuario......");

      //cargamos los datos iniciales
      this.modeladmin.loadMainData(
        (data) => {
          //guardamos todos los datos en el store
          store.dispatch(setParentData(data.parent_data));
          //store.dispatch(setNotifications(data.notifications));
          // store.dispatch(setProspects(data.prospects));
          store.dispatch(setUsers(data.users));
          store.dispatch(replacePayReports(data.pay_reports));
          // store.dispatch(setItems(data.academy));
          store.dispatch(setUserData(data.user_data));
          store.dispatch(replacePlatformData(data.platform));
          // store.dispatch(isLoadedData(true));//cuando esta en false bloquea el renderizado
          store.dispatch(isBeenLoadedMainData(true));
          store.log();

          this.alerts.showLoading(false);
          this.log.msg("cargando datos del usuario...... Perfecto !!!");
        },
        (error) => this.errorsHandler(error, () => this.initApp(), true)
      );
    }
  }

  /*!
  =========================================================
  * 
  =========================================================
  */

  clearData = () => {
    store.dispatch(replace(myRoutes.login));
    store.dispatch(reset());
    store.log();
    new DB().clear();
  };

  /*
  |--------------------------------------------------------------------------
  | Error handler
  |--------------------------------------------------------------------------
  |
  |
  */

  errorsHandler = (error, retryHandler, isStrict) => {
    console.error("%c Error > %c", "background:red; color:white", "", error);

    if (error.isAxiosError) {
      if (error.response) {
        if (error.response.status === 422) {
          Object.entries(error.response.data).forEach((error) => {
            error[1].forEach((msg) => {
              switch (msg) {
                case "error-unexist-email":
                  return this.alerts.showAlert(
                    "Revise el correo electrónico ingresado...",
                    "Correo electrónico no encontrado!",
                    true,
                    (e) => {
                      document.getElementById("input-email").focus();
                    }
                  );

                case "error-already-exist-email":
                  return this.alerts.showAlert(
                    "Ingrese otro correo...",
                    "Correo electrónico ya registrado!",
                    true,
                    (e) => {
                      document.getElementById("input-email").focus();
                    }
                  );

                case "error-already-exist-username":
                  return this.alerts.showAlert(
                    "Ingrese otro nombre...",
                    "nombre de cuenta ya registrado!",
                    true,
                    (e) => {
                      document.getElementById("input-username").focus();
                    }
                  );

                default:
                  return this.alerts.showAlert("Revise los datos ingresados");
              }
            });

            // return this.alerts.showAlert("Revise los datos ingresados :P");
          });
        } else if (error.response.status === 406) {
          return this.alerts.showWarning("Contraseña incorrecta");
        } else if (error.response.status === 401) {
          return this.alerts.showWarning(
            "Deve volver a iniciar sesión",
            "Ups... Su sesión caducó",
            true,
            () => {
              this.clearData();
            }
          );
        } else {
          return this.alerts.showErrorUnknow(retryHandler);
        }
      } else {
        return this.alerts.showErrorConexion(retryHandler, isStrict);
      }
    } else {
      return this.alerts.showErrorUnknow(retryHandler);
    }
  };
}

export default Controller_admin;
