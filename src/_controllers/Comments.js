import Logger from "helpers/Logger";
import store from "store";
import { replaceComments, addComment } from "store/comments_store/actions";

import Model_Comments from "_models/Comments";
import Controller_admin from ".././_controllers";

import { getLastTimeMark, mergeComments } from "helpers/utils"

import Dexie from "dexie";


class Controller_Comments extends Controller_admin {

  constructor() {
    super();
    this.comments = new Model_Comments();
    this.log = new Logger("Controller_Comments", "background:blue;color:white");
    this.db = new Dexie("comments");
    this.db.version(1).stores({
      comments: "item_id,data,lastMarkTime"
    });
  }

  /*!
  =========================================================
  * 
  =========================================================
  */

  loadComments(item_id, _myCallBack) {

    this.log.msg("cargando comentarios...");


    this.db.open().then(() => {

      
      //sacamos lo que tenemos en la base de datos
      this.db.comments.get(item_id).then(commentsInDb => {

        let lastUpdate = commentsInDb !== undefined ? commentsInDb.lastUpdate : 0;//ultima vez que actualizamos los datos locales

        try {
          this.comments.loadComments(item_id, lastUpdate, payload => {

            if (commentsInDb === undefined) {
              //guardamos en la base de datos
              //alert(item_id);
              let dat = {
                item_id,//primary key
                data: payload,
                lastUpdate: getLastTimeMark(payload, "c_update_at")
              };
              this.db.comments.add(dat);
              //guardamos en el store
              store.dispatch(replaceComments(item_id, dat));
              store.log();

            } else {

              if (payload.length !== 0) {
                //guardamos en la base de datos
                let dat = {
                  item_id,
                  data: mergeComments(commentsInDb.data, payload),
                  lastUpdate: getLastTimeMark(payload, "c_update_at") - 2
                };

                this.db.comments.update(item_id, dat);
                store.dispatch(replaceComments(item_id, dat));
                store.log();

              } else {
                store.dispatch(replaceComments(item_id, commentsInDb));
                store.log();
              }

            }

            this.log.msg("cargandos api:", payload);
            this.log.msg("cargandos idb:", commentsInDb);
            this.log.msg("cargando comentarios... Listo :D");

            _myCallBack();

          }, msg => {
            
            this.log.msg("cargando comentarios... Falló !!!: " + msg + "\n");

          });

        } catch (error) {

          this.log.msg("cargando comentarios... ERROR !!!: " + error + "\n");
          this.errorsHandler();
        }
      });
    });
  }

  /*!
  =========================================================
  * 
  =========================================================
  */

  postComment(item_id, content, reply_id, _callBack) {

    this.log.msg("publicando comentario...");

    this.comments.postComment(item_id, content, reply_id, (payload) => {

      payload.pic_url = store.getState().userData.pic_url;
      payload.name = store.getState().userData.name;
      payload.flag = store.getState().userData.flag;

      store.dispatch(addComment(item_id, payload));
      //store.log();

      //boramos el text-area
      document.getElementById("comment-box").value = "";
      //this.alerts.showToast("enviado");

      this.log.msg("publicando comentario... LISTO :D");
      _callBack();

    }, msg => {

      //no se pudo iniciar sesion
      if (msg === "error-param") {
        this.alerts.showAlert("Revise los datos ingresados");
      }

      this.log.msg("publicando comentario... Falló !!!: " + msg + "\n");

    }, error => {

      if (error === "error-conection") {
        this.alerts.showErrorConexion();
      } else {
        this.alerts.showErrorUnknow();
      }
      this.log.msg("publicando comentario... ERROR !!!: " + error + "\n");
    });
  }

  /*!
  =========================================================
  * 
  =========================================================
  */

  backupComments(item_id) {
    let aux = store.getState().comments[item_id];

    if (aux !== undefined) {
      this.db.open().then(() => {

        let dat = {
          item_id,//primary key
          data: aux.data,
          lastUpdate: aux.lastUpdate
        };
        this.db.comments.update(item_id, dat);
      });
    }
  }
}



export default Controller_Comments;