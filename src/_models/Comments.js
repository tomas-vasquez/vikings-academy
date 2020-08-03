import { apiUrl } from "config";

import axios from "axios";
import DB from "helpers/db";
import Controller_admin from "../_controllers";

class Model_Academy {
  constructor() {
    this.db = new DB();
    this.axios = axios;
    this.main = new Controller_admin();
  }
  /*
   *---------------------------------------------------------------
   *  carga todos los datos relacionados al usuario
   *---------------------------------------------------------------
   */

  loadComments(item_id, lastUpdate, _success, _error) {
    //empaquetamos datos necesarios
    let formData = new FormData();
    let api_token = this.db.get("api-token");
    formData.append("api-token", api_token);
    formData.append("item_id", item_id);
    formData.append("last_update", lastUpdate);

    //hacemos la consulta al servidor
    this.axios
      .get(
        apiUrl + "/comments?item_id=" + item_id + "&last_update=" + lastUpdate,
        formData
      )

      .then((response) => {
        if (_success !== undefined) _success(response);
      })
      .catch((error) => {
        _error(error);
      });
  }

  /*
   *---------------------------------------------------------------
   *
   *---------------------------------------------------------------
   */

  postComment(item_id, content, reply_id, _success, _error) {
    this.axios({
      method: "post",
      url: apiUrl + "/comments",
      headers: {
        "Content-Type": "aplication/json","api-token": this.db.get("api-token"),
      },
      data: {
        
        comment_item_id: item_id,
        comment_content: content.trim(),
        comment_reply_id: reply_id,
      },
    })
      .then((response) => {
        _success(response);
      })
      .catch((error) => {
        _error(error);
      });
  }
}

export default Model_Academy;
