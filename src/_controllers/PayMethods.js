import Logger from "helpers/Logger";
import store from "store";

import Model_PayMethods from "_models/PayMethods";
import Controller_admin from ".././_controllers"
import Alerts from "helpers/Alerts";
import { addMyPayMethod, replacePayMethodsTemplates} from "store/userData_store/actions";

class Controller_PayMethods  extends Controller_admin{

  constructor() {
    super();
    this.payMethods = new Model_PayMethods();
    this.log = new Logger("Controller_PayMethods", "background:blue;color:white");
    this.alerts = new Alerts();
  }

  /*!
  =========================================================
  * 
  =========================================================
  */

  addPayMethod = (data, _myCallBack) => {
    this.log.msg("añadiendo método de pago...");
    this.alerts.showLoading();

    try {
      this.payMethods.addPayMethod(data, payload => {

        store.dispatch(addMyPayMethod(data, payload));
        store.log();

        this.log.msg("cargando plantillas de los métodos de pago... Listo :D");
        this.alerts.showSuccess("Método de pago añadido");
        _myCallBack();

      }, msg => {

        this.log.msg("cargando comentarios... Falló !!!: " + msg + "\n");

      });

    } catch (error) {

      this.log.msg("cargando comentarios... ERROR !!!: " + error + "\n");
      this.errorsHandler();
    }
  }

  /*!
  =========================================================
  * 
  =========================================================
  */

 loadTemplates = (country, _myCallBack) => {
    this.log.msg("cargando plantillas de los métodos de pago...");
    try {
      this.payMethods.loadTemplates(country, payload => {
        console.log(country, payload);
        store.dispatch(replacePayMethodsTemplates(country, payload));
        store.log();

        this.log.msg("cargando plantillas de los métodos de pago... Listo :D");
        _myCallBack();

      }, msg => {

        this.log.msg("cargando comentarios... Falló !!!: " + msg + "\n");

      });

    } catch (error) {

      this.log.msg("cargando comentarios... ERROR !!!: " + error + "\n");
      this.errorsHandler(error);
    }
  }

}



export default Controller_PayMethods;