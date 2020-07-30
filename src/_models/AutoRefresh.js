import store from "store";

import { replaceUserData } from "store/userData_store/actions";
import { replaceParentData } from "store/parentData_store/actions";
import { replaceNotifications } from "store/notifications_store/actions";
import { replaceProspects } from "store/prospects_store/actions";
import { replaceUsers } from "store/users_store/actions";
import { replacePayReports } from "store/pay_reports_store/actions";
import { replaceItems } from "store/academy_store/actions";
import { addComment, setLastUpdate } from "store/comments_store/actions";

import { subscribeToAutoRefresher, removeAllSubscribersToAutoRefresher, setIsOffline } from "store/app_store/actions";

import Looger from "helpers/Logger";
import { apiUrl } from "config";

import axios from "axios";
import DB from "helpers/db";
import Alerts from "helpers/Alerts";

import Controller_admin from "../_controllers";

import { basenameOffice } from "config";

class Controller_AutoRefresh {

  constructor() {
    this.db = new DB();
    this.axios = axios;
    this.log = new Looger("AutoRefresh", "background:red;color:white");
  }
  /*!
  =========================================================
  * 
  =========================================================
  */

  running = false;
  processId = null;
  milis = 2000;
  flagMedium = 1;
  flagLow = 1;



  initProcess() {


    //proceso de actualizacion automatica de datos
    setTimeout(() => {

      let subscribers = store.getState().app.autoRefresherSubscribers;

      let names = subscribers.filter(a => { return a.priority === "HIGH_PRIORITY" }).map(subscriber => { return subscriber.name });
      let mediumPriorityKeys = subscribers.filter(a => { return a.priority === "MEDIUM_PRIORITY" }).map(subscriber => { return subscriber.name });
      let lowPriorityKeys = subscribers.filter(a => { return a.priority === "LOW_PRIORITY" }).map(subscriber => { return subscriber.name });

      if (this.flagMedium >= 5) {
        names = [...names, ...mediumPriorityKeys];
        this.flagMedium = 1;
      } else {
        this.flagMedium = this.flagMedium + 1;
      }

      if (this.flagLow >= 10) {
        names = [...names, ...lowPriorityKeys];
        this.flagLow = 1;
      } else {
        this.flagLow = this.flagLow + 1;
      }

      if (names.length > 0) {
        this.loadPack(names);
      } else {
        this.initProcess();
      }

    }, this.milis)

  }

  /*!
  =========================================================
  * 
  =========================================================
  */

  killProcess() {
    let log = new Looger("AutoRefresh", "background:red;color:white");
    log.msg("muerto...");
    clearInterval(this.processId);
    //borramos todos los subscriptores
    store.dispatch(removeAllSubscribersToAutoRefresher());
    this.processId = null;
  }

  /*!
=========================================================
* 
=========================================================
*/

  updateSubscribers = () => {
    let storeData = store.getState();

    //borramos todos los subscriptores
    store.dispatch(removeAllSubscribersToAutoRefresher());

    //calculamos subscriptores necesarios

    //el usuario no tiene algún producto && el usuario ;tiene un reporte de pago esperando revision
    if (storeData.userData.products === null && storeData.payReports !== null) {
      store.dispatch(subscribeToAutoRefresher("user_data", "MEDIUM_PRIORITY"));
    }

    //si es que estamos en la oficina
    let inOffice = "/" + document.location.pathname.split("/")[1] === basenameOffice;

    //si es que el usuario tiene algún producto
    if (storeData.userData.products !== null && inOffice) {
      store.dispatch(subscribeToAutoRefresher("users", "HIGH_PRIORITY"));
      store.dispatch(subscribeToAutoRefresher("pay_reports", "MEDIUM_PRIORITY"));
      store.dispatch(subscribeToAutoRefresher("prospects", "LOW_PRIORITY"));

      this.log.msg("añadidos subscribers básicos de office");
    }

    //revivimos el proceso si es que estta muerto 
    if (this.processId === null && store.getState().app.autoRefresherSubscribers.length !== 0) {
      this.log.msg("revivido...");
      this.initProcess();
    }
  }

  /*!
  =========================================================
  * funcion que ejecuta los callback de los subscriptores
  =========================================================
  */

  runCallBack = (name, subscribers) => {
    let subscriber = subscribers.find(subscriber => {
      return subscriber.name.split("?")[0] === name
    });
    //console.log(subscriber);
    if (subscriber.myCallBack !== null && subscriber.myCallBack !== undefined) {
      subscriber.myCallBack();
    }

  };

  /*!
  =========================================================
  * 
  =========================================================
  */

  loadPack = (names) => {

    //empaquetamos datos necesarios
    let formData = new FormData();
    let api_token = this.db.get("api-token");
    formData.append("api-token", api_token);
    formData.append("pack", JSON.stringify({ names }));

    //hacemos la consulta al servidor
    this.axios.post(apiUrl + "/admin/payload/getdata", formData)

      .then(response => {
        store.dispatch(setIsOffline(false));

        let result = response.data.result;//resultado de la consulta
        let data = response.data.payload;

        if (result === "all-ok") {

          // datos de usuario
          if (data.user_data !== undefined) {
            store.dispatch(replaceUserData(data.user_data));
            
            //ejecutamos el callback del subscriptor del auto refresher
            let subscriber = store.getState().app.autoRefresherSubscribers.find(subscriber => {
              return subscriber.name.split("?")[0] === "user_data";
            });

            if (subscriber.myCallBack !== null && subscriber.myCallBack !== undefined) {
              subscriber.myCallBack();
            }
          }

          if (data.parent_data !== undefined) store.dispatch(replaceParentData(data.parent_data));
          if (data.notifications !== undefined) store.dispatch(replaceNotifications(data.notifications));
          if (data.prospects !== undefined) store.dispatch(replaceProspects(data.prospects));
          if (data.users !== undefined) store.dispatch(replaceUsers(data.users));
          if (data.my_pay_report !== undefined) store.dispatch(replacePayReports(data.my_pay_report));
          if (data.pay_reports !== undefined) store.dispatch(replacePayReports(data.pay_reports));
          if (data.academy !== undefined) store.dispatch(replaceItems(data.academy));

          // comentarios de la academia
          if (data.comments !== undefined) {

            //metemos los comentarios al store
            data.comments.forEach(comment => {
              store.dispatch(addComment(comment.item_id, comment));
            });
            //alert(data.comments_after_at);
            store.dispatch(setLastUpdate(data.comments_id, data.comments_after_at - 2));

            //ejecutamos el callback del subscriptor del auto refresher
            let subscriber = store.getState().app.autoRefresherSubscribers.find(subscriber => {
              return subscriber.name.split("?")[1] === data.comments_id;
            });

            //actualizamos el subscriptor del auto refresher con la nueva "lastUpdate"
            store.dispatch(subscribeToAutoRefresher("comments?" + data.comments_id + "?" + (data.comments_after_at - 2), subscriber.priority, subscriber.myCallBack));

            if (subscriber.myCallBack !== null && subscriber.myCallBack !== undefined) {
              subscriber.myCallBack();
            }
          }

        }
        this.initProcess()
      }).catch((error) => {
        this.initProcess()
        store.dispatch(setIsOffline(true));
        console.log(error);

        let alerts = new Alerts();
        if (error === "error-conection") {
          //this.alerts.showErrorConexion();

        } else {

          if (error.response !== undefined) {
            if (error.response.data.result === "session-error") {
              alerts.showAlert("Deve volver a iniciar sesión", "Sesión caducada", true, e => {
                new Controller_admin().initLogin();
              });
            } else {
              //alerts.showErrorUnknow();
            }
          } else {

            //alerts.showErrorUnknow();
          }
        }

      })

  }
}

export default Controller_AutoRefresh;