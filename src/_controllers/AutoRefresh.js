import store from "store";

// import { replaceUserData } from "store/userData_store/actions";
// import { replaceParentData } from "store/parentData_store/actions";
// import { replaceNotifications } from "store/notifications_store/actions";
// import { replaceProspects } from "store/prospects_store/actions";
// import { replaceUsers } from "store/users_store/actions";
// import { replacePayReports } from "store/pay_reports_store/actions";
// import { replaceItems } from "store/academy_store/actions";
import { addComment, setLastUpdate } from "store/comments_store/actions";

import {
  subscribeToAutoRefresher,
  removeAllSubscribersToAutoRefresher,
  setIsOffline,
} from "store/app_store/actions";

import Looger from "helpers/Logger";
// import { apiUrl } from "config";

import axios from "axios";
import DB from "helpers/db";
// import Alerts from "admin/helpers/Alerts";

import Controller_admin from "./";

import AutoRefresh from "_models/AutoRefresh";
import { setTimeout } from "timers";

class Controller_AutoRefresh extends Controller_admin {
  constructor() {
    super();
    this.db = new DB();
    this.axios = axios;
    this.log = new Looger("AutoRefresh", "background:red;color:white");
    this.autoRefresh = new AutoRefresh();
  }
  /*!
  =========================================================
  * 
  =========================================================
  */

  running = false;
  processId = null;
  flagMedium = 1;
  flagLow = 1;

  buildNewConsult = (milis = 4000) => {
    //proceso de actualizacion automatica de datos
    setTimeout(() => {
      let subscribers = store.getState().app.autoRefresherSubscribers;

      let pack = subscribers
        .filter((a) => {
          return a.priority === "HIGH_PRIORITY";
        })
        .map((subscriber) => {
          return subscriber.name;
        });
      let mediumPriorityKeys = subscribers
        .filter((a) => {
          return a.priority === "MEDIUM_PRIORITY";
        })
        .map((subscriber) => {
          return subscriber.name;
        });
      let lowPriorityKeys = subscribers
        .filter((a) => {
          return a.priority === "LOW_PRIORITY";
        })
        .map((subscriber) => {
          return subscriber.name;
        });

      if (this.flagMedium >= 5) {
        pack = [...pack, ...mediumPriorityKeys];
        this.flagMedium = 1;
      } else {
        this.flagMedium = this.flagMedium + 1;
      }

      if (this.flagLow >= 10) {
        pack = [...pack, ...lowPriorityKeys];
        this.flagLow = 1;
      } else {
        this.flagLow = this.flagLow + 1;
      }

      if (pack.length > 0) {
        this.loadPack(pack);
      } else {
        this.buildNewConsult();
      }
    }, milis);
  };

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
    // let storeData = store.getState();

    //borramos todos los subscriptores
    // store.dispatch(removeAllSubscribersToAutoRefresher());

    //calculamos subscriptores necesarios

    // //el usuario no tiene algún producto && el usuario ;tiene un reporte de pago esperando revision
    // if (storeData.userData.products === null && storeData.payReports !== null) {
    //   store.dispatch(subscribeToAutoRefresher("user_data", "MEDIUM_PRIORITY"));
    // }

    // //si es que estamos en la oficina
    // let inOffice = "/" + document.location.pathpack.split("/")[1] === basepackOffice;

    // //si es que el usuario tiene algún producto
    // if (storeData.userData.products !== null && inOffice) {
    //   store.dispatch(subscribeToAutoRefresher("users", "HIGH_PRIORITY"));
    //   store.dispatch(subscribeToAutoRefresher("pay_reports", "MEDIUM_PRIORITY"));
    //   store.dispatch(subscribeToAutoRefresher("prospects", "LOW_PRIORITY"));

    //   this.log.msg("añadidos subscribers básicos de office");
    // }

    //revivimos el proceso si es que estta muerto
    if (
      this.processId === null &&
      store.getState().app.autoRefresherSubscribers.length !== 0
    ) {
      this.log.msg("revivido...");
    }
    this.buildNewConsult();
  };

  /*!
  =========================================================
  * funcion que ejecuta los callback de los subscriptores
  =========================================================
  */

  runCallBack = (pack, subscribers) => {
    let subscriber = subscribers.find((subscriber) => {
      return subscriber.pack.split("?")[0] === pack;
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

  loadPack = (pack) => {
    this.autoRefresh.loadPack(
      pack,
      (response) => {
        // alert("hola");

        // store.dispatch(setIsOffline(false));

        // comentarios
        let comments = response.data.comments;
        if (comments !== undefined) {
          //metemos los comentarios al store

          comments.comments.forEach((comment) => {

            console.log(comment);
            store.dispatch(addComment(comment.comment_item_id, comment));
          });

          store.dispatch(
            setLastUpdate(comments.comment_item_id, comments.last_update)
          );

          //ejecutamos el callback del subscriptor del auto refresher
          let subscriber = store
            .getState()
            .app.autoRefresherSubscribers.find((subscriber) => {
              return subscriber.name.split("?")[1] === comments.comment_item_id;
            });

          //actualizamos el subscriptor del auto refresher con la nueva "lastUpdate"
          store.dispatch(
            subscribeToAutoRefresher(
              "comments?" +
                comments.comment_item_id +
                "?" +
                (comments.last_update - 2),
              subscriber.priority,
              subscriber.myCallBack
            )
          );

          if (
            subscriber.myCallBack !== null &&
            subscriber.myCallBack !== undefined
          ) {
            subscriber.myCallBack();
          }
        }

        this.buildNewConsult();
      },
      (error) => {
        console.error(error);
        this.buildNewConsult();
        store.dispatch(setIsOffline(true));
      }
    );
  };
}

export default Controller_AutoRefresh;
