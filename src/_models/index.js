
import axios from "axios";
import { apiUrl } from "config";
import DB from "helpers/db";

class Model_Blog {

  constructor() {
    this.db = new DB();
    this.axios = axios;
  }

  /*
  *---------------------------------------------------------------
  *  
  *---------------------------------------------------------------
  */

  loadMainData(_success, _error) {

    axios({
      method: "get",
      url: apiUrl + "/user_data/pack/init_pack",
      headers: {
        "Accept": "aplication/json",
        "api-token": this.db.get("api-token")
      },
    })
      .then(response => { _success(response.data); })
      .catch(error => { _error(error) });
  }

}

export default Model_Blog;