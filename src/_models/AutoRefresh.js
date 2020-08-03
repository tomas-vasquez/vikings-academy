import Looger from "helpers/Logger";
import { apiUrl } from "config";

import axios from "axios";
import DB from "helpers/db";

class AutoRefresh {
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

  loadPack = (pack, _success, _error) => {
    //hacemos la consulta al servidor
    this.axios({
      method: "get",
      url: apiUrl + "/auto_refresher?pack=" + JSON.stringify(pack),
      headers: {
        "Content-Type": "aplication/json",
        "api-token": this.db.get("api-token"),
      },
    })
      .then((response) => {
        _success(response);
      })
      .catch((error) => {
        _error(error);
      });
  };
}

export default AutoRefresh;
