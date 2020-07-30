import Logger from "helpers/Logger";
import Alerts from "helpers/Alerts";
import DB from "helpers/db";

import store from "store";
import { addDomFile, replaceRemoteStorage } from "store/platform_store/actions";
import Model_Editor from "admin/_models/Editor";
import Controller_admin from ".";

class Controller_Editor extends Controller_admin {
  constructor() {
    super();
    this.log = new Logger("Controller_Editor", "background:blue;color:white");
    this.alerts = new Alerts();
    this.db = new DB();
    this.modelEditor = new Model_Editor();
  }

  /*!
=========================================================
* 
=========================================================
*/

  downloadDom(domUrl, _callback) {
    this.log.msg("descargando dom.json ......");

    this.modelEditor.downloadDom(
      domUrl,
      (response) => {
        store.dispatch(addDomFile(domUrl, response.data));
        store.log();

        this.log.msg("descargando dom.json\n");
        if (_callback !== undefined) _callback(response.data);
      },
      (error) =>
        this.errorsHandler(error, () => this.downloadDom(domUrl, _callback))
    );
  }

  /*!
  =========================================================
  * 
  =========================================================
  */

  uploadDom(domUrl, content, _callback) {
    this.alerts.showUploding(true, "subiendo...");
    this.log.msg("subiendo dom.json ......");

    content.author_id = 1;
    let blob = new Blob([JSON.stringify(content)], { type: "aplication/json" });

    this.modelEditor.uploadDom(
      domUrl,
      blob,
      (progressEvent) => {
        let percentage = progressEvent.loaded / (progressEvent.total / 100);
        this.alerts.setUplodingPercentage(percentage);
      },
      (response) => {
        this.alerts.showUploding(false);
        this.alerts.showSuccess("Contenido actualizado");

        this.log.msg("subiendo dom.json\n");
        if (_callback !== undefined) _callback(response.data);
      },
      (error) =>
        this.errorsHandler(error, () =>
          this.uploadDom(domUrl, content, _callback)
        )
    );
  }

  /*!
  =========================================================
  * 
  =========================================================
  */

  loadStorageMap(_callback) {
    this.log.msg("descargando mapa de almasenamiento ......");

    this.modelEditor.loadStorageMap(
      (response) => {
        store.dispatch(replaceRemoteStorage(response.data));
        store.log();
        this.log.msg("descargando mapa de almasenamiento ......\n");
        if (_callback !== undefined) _callback(response.data);
      },
      (error) => this.errorsHandler(error, () => this.loadStorageMap(_callback))
    );
  }
  /*!
=========================================================
* 
=========================================================
*/

  uploadToStorage(name, blob, thumbnail, _callback) {
    this.alerts.showUploding(true, "subiendo...");
    this.log.msg("subiendo archivo ......");

    this.modelEditor.uploadToStorage(
      name,
      blob,
      thumbnail,
      (progressEvent) => {
        let percentage = progressEvent.loaded / (progressEvent.total / 100);
        this.alerts.setUplodingPercentage(percentage);
      },
      (response) => {
        store.dispatch(replaceRemoteStorage(response.data));
        store.log();
        this.alerts.showUploding(false);
        this.log.msg("subiendo archivo ......\n");
        if (_callback !== undefined) _callback(response.data);
      },
      (error) =>
        this.errorsHandler(error, () =>
          this.uploadToStorage(name, blob, thumbnail, _callback)
        )
    );
  }
}

export default Controller_Editor;
