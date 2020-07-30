

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
        this.axios.post(apiUrl + "/admin/comments/get_comments", formData)

            .then(response => {
                let result = response.data.result;//resultado de la consulta

                if (result === "all-ok") {

                    //ejecutamos el metodo success
                    if (_success !== undefined) _success(response.data.payload);

                }

            });

    }

    /*
    *---------------------------------------------------------------
    * 
    *---------------------------------------------------------------
    */

    postComment(item_id, content, reply_id, _success, _error) {

        //empaquetamos datos necesarios
        let formData = new FormData();
        let api_token = this.db.get("api-token");
        formData.append("api-token", api_token);
        formData.append("item_id", item_id);
        formData.append("content", content.trim());
        formData.append("reply_id", reply_id);

        //hacemos la consulta al servidor
        this.axios.post(apiUrl + "/admin/comments/post_comment", formData)

            .then(response => {
                let result = response.data.result;//resultado de la consulta

                if (result === "all-ok") {

                    //ejecutamos el metodo success
                    if (_success !== undefined) _success(response.data.payload);

                }

            }).catch(error => {
                this.main.errorsHandler(error);
            });
    }
   
}

export default Model_Academy;