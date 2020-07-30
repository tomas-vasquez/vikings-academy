

import { apiUrl } from "config";

import axios from "axios";
import DB from "helpers/db";
import Controller_admin from "../_controllers";

class Model_PayMethods {

    constructor() {
        this.db = new DB();
        this.axios = axios;
        this.main = new Controller_admin();
    }

    /*
    *---------------------------------------------------------------
    *  
    *---------------------------------------------------------------
    */

    addPayMethod = (data, _success, _error) => {
        //empaquetamos datos necesarios
        let formData = new FormData();
        let api_token = this.db.get("api-token");
        formData.append("api-token", api_token);
        formData.append("imgUrl", data.imgUrl);
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("color", data.color);
        formData.append("country", data.country);
        formData.append("backgroundColor", data.backgroundColor);

        //hacemos la consulta al servidor
        this.axios.post(apiUrl + "/admin/paymethods/add_method", formData)

            .then(response => {
                let result = response.data.result;//resultado de la consulta

                if (result === "all-ok") {

                    //ejecutamos el metodo success
                    if (_success !== undefined) _success(response.data.payload);

                }

            }
        );
    }


    /*
    *---------------------------------------------------------------
    *  
    *---------------------------------------------------------------
    */

    loadTemplates(country, _success, _error) {

        //empaquetamos datos necesarios
        let formData = new FormData();
        let api_token = this.db.get("api-token");
        formData.append("api-token", api_token);
        formData.append("only_country", country);

        //hacemos la consulta al servidor
        this.axios.post(apiUrl + "/admin/paymethods/get_templates", formData)

            .then(response => {
                let result = response.data.result;//resultado de la consulta

                if (result === "all-ok") {

                    //ejecutamos el metodo success
                    if (_success !== undefined) _success(response.data.payload);

                }

            }
        );
    }
}

export default Model_PayMethods;