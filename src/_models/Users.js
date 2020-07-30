
import { apiUrl } from "config";

import axios from "axios";
import DB from "helpers/db";

class Model_User {

  constructor() {
    this.db = new DB();
    this.axios = axios;
  }

  /*
  *---------------------------------------------------------------
  * registro de prospectos
  *---------------------------------------------------------------
  // */

  // addProspect = (form, _success, _error) => {
  //   

  //   // sacamos el "parent" de la url
  //   let url = document.location.href;
  //   let parent = url.split("/")[url.split("/").length - 1];

  //   if (parent.startsWith("@")) {
  //     parent = parent.slice(1);
  //   } else {
  //     parent = "founders"
  //   }

  //   let myform = new FormData(form);

  //   myform.append("parent", parent);
  //   log.msg("añadiendo prospecto... : ", form);

  //   //hacemos la consulta al servidor
  //   this.axios.post(apiUrl + "/admin/users/add_prospect", myform)

  //     .then(response => {

  //       let msg = response.data.result;//resultado de la consulta
  //       if (msg === "all-ok") {

  //         log.msg("se recivió y guardó una llave de session :) ");
  //         log.msg("el prospecto se añadió exitosamente :)");

  //         if (_success !== undefined) _success(response.data.api_token, response.data.parent);//ejecutamos el metodo success

  //       } else {
  //         log.msg("no se pudo añadir al prospecto ");
  //         if (_error !== undefined) _error(msg);
  //       }

  //     }).catch(error => {

  //       if (_error !== undefined) _error();

  //     });;
  // };

  /*
  *---------------------------------------------------------------
  * registro de usuarios
  *---------------------------------------------------------------
  */

  register = (data, _success, _error) => {
    
    // sacamos el "parent" de la url
    let url = document.location.href;
    let parent = url.split("/")[url.split("/").length - 1];

    if (parent.startsWith("@")) {
      parent = parent.slice(1);
    } else {
      parent = "founders"
    }

    data.parent_user_name = parent;

    //hacemos la consulta al servidor
    this.axios({
      method: "post",
      url: apiUrl + "/user/register",
      headers: {
        "Content-Type": "aplication/json"
      },
      data: data

    })
      .then(response => { _success(response) })
      .catch(error => { _error(error) });
  }

  /*
  *---------------------------------------------------------------
  * logeo de usuarios
  *---------------------------------------------------------------
  */

  login = (data, _success, _error) => {

    //hacemos la consulta al servidor
    this.axios({
      method: "post",
      url: (apiUrl + "/user/login"),
      headers: {
        "Content-Type": "aplication/json"
      },
      data: data

    })
      .then(response => { _success(response) })
      .catch(error => { _error(error) });
  };

  /*
  *---------------------------------------------------------------
  * 
  *---------------------------------------------------------------
  */

  logout = (_success, _error) => {

    //hacemos la consulta al servidor
    this.axios({
      method: "get",
      url: (apiUrl + "/user/logout"),
      headers: {
        "api-token": this.db.get("api-token")
      },

    })
      .then(response => { _success(response) })
      .catch(error => { _error(error) });
  };


  /*
  *---------------------------------------------------------------
  * 
  *---------------------------------------------------------------
  */


  get_user_data = ($id, _success, _error) => {

    //hacemos la consulta al servidor
    this.axios({
      method: "get",
      url: (apiUrl + "/user_data/" + $id),
      headers: {
        "api-token": this.db.get("api-token")
      },

    })
      .then(response => { _success(response) })
      .catch(error => { _error(error) });
  }

}

export default Model_User;