import Logger from "helpers/Logger";
import Alerts from "helpers/Alerts";
import DB from "helpers/db";

import store from "store";
import Model_Academy from "_models/Academy";
import Controller_admin from ".";
import {
  setCourses,
  setAuthors,
  setDescription,
} from "store/academy_store/actions";
import { setItems } from "store/academy_store/actions";

class Controller_Academy extends Controller_admin {
  constructor() {
    super();
    this.log = new Logger("Controller_Academy", "background:blue;color:white");
    this.alerts = new Alerts();
    this.db = new DB();
    this.modelAcademy = new Model_Academy();
  }

  /*!
=========================================================
* 
=========================================================
*/

  loadCourses(_callback) {
    this.log.msg("descargando courses ......");

    this.modelAcademy.loadCourses(
      (response) => {
        store.dispatch(setCourses(response.data.courses));
        store.dispatch(setAuthors(response.data.authors));
        store.log();

        this.log.msg("descargando courses\n");
        if (_callback !== undefined) _callback(response.data);
      },
      (error) => this.errorsHandler(error, () => this.loadCourses(_callback))
    );
  }
  /*!
=========================================================
* 
=========================================================
*/

  loadItems(currentCourse, _callback) {
    this.log.msg("descargando courses ......");

    this.modelAcademy.loadItems(
      currentCourse,
      (response) => {
        store.dispatch(setItems(currentCourse, response.data.items));
        store.log();

        this.log.msg("descargando courses\n");
        if (_callback !== undefined) _callback(response.data);
      },
      (error) =>
        this.errorsHandler(error, () =>
          this.loadItems(currentCourse, _callback)
        )
    );
  }
  /*!
=========================================================
* 
=========================================================
*/

  loadDescription(currentDescription, _callback) {
    this.log.msg("descargando descripcion ......");

    this.modelAcademy.loadDescription(
      currentDescription,
      (response) => {
        store.dispatch(setDescription(currentDescription, response.data));
        store.log();

        this.log.msg("descargando descripcion\n");
        if (_callback !== undefined) _callback(response.data);
      },
      (error) =>
        this.errorsHandler(error, () =>
          this.loadDescription(currentDescription, _callback)
        )
    );
  }
}

export default Controller_Academy;
