import axios from "axios";
import { serverUrl } from "config";
import { apiUrl } from "config";
import DB from "helpers/db";

class Model_Editor {
  constructor() {
    this.db = new DB();
  }
  /*
   *---------------------------------------------------------------
   *
   *---------------------------------------------------------------
   */

  downloadDom(domUrl, _success, _error) {
    //hacemos la consulta al servidor
    axios({
      method: "get",
      url: serverUrl + "/storage/platform/" + domUrl + ".dom.json",
    })
      .then((response) => {
        setTimeout(() => {
          _success(response);
        }, 100);
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

  uploadDom(domJsonName, blob, onUploadProgress, _success, _error) {
    //hacemos la consulta al servidor

    var formData = new FormData();
    formData.append("blob", blob);

    axios({
      method: "post",
      url: apiUrl + "/platform/" + domJsonName,
      headers: {
        "Content-Type": "aplication/json",
        "api-token": this.db.get("api-token"),
      },
      data: formData,
      onUploadProgress,
    })
      .then((response) => {
        setTimeout(() => {
          _success(response);
        }, 500);
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
  downloadPlatformData(platformName, _success, _error) {
    //hacemos la consulta al servidor
    axios({
      method: "get",
      url: serverUrl + "/storage/platform/names/" + platformName + ".json",
    })
      .then((response) => {
        setTimeout(() => {
          _success(response);
        }, 100);
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

  loadStorageMap(_success, _error) {
    //hacemos la consulta al servidor
    axios({
      method: "get",
      url: apiUrl + "/platform/getStorageMap",
      headers: {
        "Content-Type": "aplication/json",
        "api-token": this.db.get("api-token"),
      },
    })
      .then((response) => {
        setTimeout(() => {
          _success(response);
        }, 100);
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

  uploadToStorage(name, blob, thumbnail, onUploadProgress, _success, _error) {
    //hacemos la consulta al servidor
    var formData = new FormData();
    formData.append("name", name);
    formData.append("blob", blob);
    formData.append("thumbnail", thumbnail);

    axios({
      method: "post",
      url: apiUrl + "/platform/uploadToStorage",
      headers: {
        "Content-Type": "aplication/json",
        "api-token": this.db.get("api-token"),
      },
      data: formData,
      onUploadProgress,
    })
      .then((response) => {
        setTimeout(() => {
          _success(response);
        }, 500);
      })
      .catch((error) => {
        _error(error);
      });
  }
}

export default Model_Editor;
