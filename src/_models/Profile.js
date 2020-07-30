import { apiUrl } from "config";

import axios from "axios";
import DB from "helpers/db";

class Model_Profile {

  constructor() {
    this.db = new DB();
    this.axios = axios;
  }

  /*!
  =========================================================
  * 
  =========================================================
  */

  uploadPic = (blob, onUploadProgress, _success, _error) => {
 
    var formData = new FormData();
    formData.append("blob", blob);

    //hacemos la consulta al servidor
    this.axios({
      method: "post",
      url: (apiUrl + "/user_pic"),
      headers: {
        "api-token": this.db.get("api-token")
      },
      data: formData,
      onUploadProgress
    })
      .then(response => {
        setTimeout(() => {
          _success(response)
        }, 500);
      })
      .catch(error => { _error(error) });
  }


  /*!
=========================================================
* 
=========================================================
*/



  deletePic = (_success, _error) => {

    //hacemos la consulta al servidor
    this.axios({
      method: "delete",
      url: (apiUrl + "/user_pic"),
      headers: {
        "Content-Type": "aplication/json",
        "api-token": this.db.get("api-token")
      },
    })
      .then(response => {
        setTimeout(() => {
          _success(response)
        }, 100);
      })
      .catch(error => { _error(error) });
  }

  /*!
  =========================================================
  * 
  =========================================================
  */


  updateUserData = (data, _success, _error) => {

    //hacemos la consulta al servidor
    this.axios({
      method: "post",
      url: (apiUrl + "/user_data"),
      headers: {
        "Content-Type": "aplication/json",
        "api-token": this.db.get("api-token")
      },
      data: data
    })
      .then(response => {
        setTimeout(() => {
          _success(response)
        }, 100);
      })
      .catch(error => { _error(error) });
  }
}

export default Model_Profile;