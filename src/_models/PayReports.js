
import Logger from "helpers/Logger";

import { apiUrl } from "config";

import axios from "axios";
import DB from "helpers/db";

class Model_PayReports {

  constructor() {
    this.db = new DB();
    this.axios = axios;
  }

  /*!
  =========================================================
  * 
  =========================================================
  */

  uploadReport = (formData, onUploadProgress, _success, _error) => {
    let log = new Logger("Model_PayReports uploadReport", "background:cyan", 2);
    log.msg("subiendo reporte... ");

    //hacemos la consulta al servidor
    this.axios({
      method: "post",
      url: (apiUrl + "/pay_report"),
      headers: {
        "api-token": this.db.get("api-token")
      },
      onUploadProgress,
      data: formData
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

  deletePayReport = (report_id, _success, _error) => {
    let log = new Logger("Model_PayReports deletePayReport", "background:cyan", 2);
    log.msg("borrando reporte...  ");

    //hacemos la consulta al servidor
    this.axios({
      method: "delete",
      url: (apiUrl + "/pay_report/" + report_id),
      headers: {
        "api-token": this.db.get("api-token")
      }
    })
      .then(response => { _success(response) })
      .catch(error => { _error(error) });
  }

  /*!
  =========================================================
  * 
  =========================================================
  */

  aprovePayReport = (report_id, _success, _error) => {
    let log = new Logger("Model_PayReports aprovePayReport", "background:cyan", 2);
    log.msg("aprovando reporte...  ");

    //hacemos la consulta al servidor
    this.axios({
      method: "post",
      url: (apiUrl + "/pay_report/aprove/" + report_id),
      headers: {
        "api-token": this.db.get("api-token")
      }
    })
      .then(response => { _success(response) })
      .catch(error => { _error(error) });




    // var formData = new FormData();
    // let api_token = this.db.get("api-token");
    // formData.append("api-token", api_token);
    // formData.append("report_id", payReport.report_id);



    // //hacemos la consulta al servidor
    // this.axios.post(apiUrl + "/admin/payreports/aprove", formData)
    //   .then(response => {
    //     let result = response.data.result;//resultado de la consulta

    //     if (result === "all-ok") {

    //       log.msg("reporte aprovado exitosamente :)");
    //       if (_success !== undefined) _success();//ejecutamos el metodo success

    //     } else {

    //       log.msg("no se pudo aprovar el reporte :(\n");
    //       if (_error !== undefined) _error(result);

    //     }

    //   });
  }
}

export default Model_PayReports;