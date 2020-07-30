import swal from "sweetalert2";

import Model_Profile from "_models/Profile";

import Logger from "helpers/Logger";
import Alerts from "helpers/Alerts";
import Db from "helpers/db";

import store from "store";
import { setUserData } from "store/userData_store/actions";

import { storageUrl } from "config";
import Controller_admin from ".";

import { cropToProfilePic } from "helpers/image";

class Controller_Profile extends Controller_admin {
  constructor() {
    super();
    this.profile = new Model_Profile();
    this.log = new Logger("Profile Controller", "background:blue;color:white");
    this.alerts = new Alerts();
    this.db = new Db();
  }

  /*!
  =========================================================
  * 
  =========================================================
  */

  handleClickPic = (e) => {
    let picUrl = "";
    let pic_url = store.getState().userData.pic_url;
    let blob_pic_url = store.getState().userData.blob_pic_url;

    if (blob_pic_url !== undefined && blob_pic_url !== null) {
      picUrl = blob_pic_url;
    } else {
      if (pic_url !== null) {
        picUrl = storageUrl + pic_url;
      } else {
        picUrl = require("assets/img/noPic.jpg");
      }
    }

    swal
      .fire({
        title: "Foto de perfil",
        imageUrl: picUrl,
        imageHeight: 180,
        imageWidth: 180,
        showCloseButton: true,
        showCancelButton: pic_url,
        buttonsStyling: false,
        confirmButtonText: '<i class="fa fa-pencil-alt"></i> cambiar',
        confirmButtonClass: "btn btn-primary",
        cancelButtonText: '<i class="fa fa-trash"></i> borrar',
        cancelButtonClass: "btn btn-danger",
        footer:
          "<small className='text-muted'>Importante: esta imagen es pública dentro del sistema de tloging</small>",
      })
      .then((result) => {
        if (result.value) {
          document.getElementById("input-pic").click();
        } else if (result.dismiss === "cancel") {
          this.deletePic();
        }
      });
  };

  /*
   *---------------------------------------------------------------
   *
   *---------------------------------------------------------------
   */

  handle_pic_selected(file) {
    //vemos si la imagen seleccionada es v{alida}

    cropToProfilePic(file, (blob) => {
      this.unsafeUploadPic(blob);
    });
  }

  unsafeUploadPic = (blob) => {
    this.alerts.showUploding(true, "subiendo...");
    this.log.msg("actualizando foto de perfíl...");

    this.profile.uploadPic(
      blob,
      (progressEvent) => {
        let percentage = progressEvent.loaded / (progressEvent.total / 100);
        this.alerts.setUplodingPercentage(percentage);
      },
      (response) => {
        this.alerts.showUploding(false);
        this.alerts.showSuccess("Foto de perfil actualizada");

        store.dispatch(
          setUserData({
            blob_pic_url: URL.createObjectURL(blob),
            pic_url: response.data,
          })
        );
        store.log();

        this.log.msg("actualizando foto de perfil\n");
      },
      (error) => this.errorsHandler(error, () => this.unsafeUploadPic(blob))
    );
  };

  /*!
  =========================================================
  * 
  =========================================================
  */

  deletePic = () => {
    this.log.msg("eliminando foto de perfil... ");

    swal
      .fire({
        showCloseButton: true,
        showCancelButton: true,
        buttonsStyling: false,
        icon: "question",
        title: "Eliminar foto de perfil",
        text: "Está seguro de eliminar su foto de perfil?",
        confirmButtonText: '<i className="fa fa-trash"></i> Sí, eliminar',
        confirmButtonClass: "btn btn-danger",
        cancelButtonText: "cancelar",
        cancelButtonClass: "btn btn-primary",
      })
      .then((result) => {
        if (result.value) {
          this.unsafeDeletePic();
        } else if (result.dismiss === "cancel") {
          this.handleClickPic();
          this.log.msg("eliminando foto de perfil... cancelado! :D\n");
        }
      });
  };

  unsafeDeletePic = () => {
    this.alerts.showLoading(true, "eliminando...");

    this.profile.deletePic(
      () => {
        this.alerts.showSuccess("Foto de perfil eliminada");

        store.dispatch(
          setUserData({
            blob_pic_url: undefined,
            pic_url: null,
          })
        );
        store.log();

        this.log.msg("eliminando foto de perfil\n");
      },
      (error) => this.errorsHandler(error, () => this.unsafeDeletePic())
    );
  };

  /*!
  =========================================================
  * 
  =========================================================
  */

  updateUserData = (form) => {
    this.alerts.showConfirm(
      "está seguro de continuar?",
      "Actualizando datos de su perfíl",
      true,
      () => {
        this.log.msg("actualizando perfil...");
        this.unsafeUpdateUserData(form);
      }
    );
  };

  unsafeUpdateUserData = (form) => {
    this.alerts.showLoading(true);

    let data = {};

    for (let index = 0; index < form.length; index++) {
      if (form[index].name) {
        data[form[index].name] = form[index].value;
      }
    }

    this.profile.updateUserData(
      data,
      (response) => {
        this.alerts.showSuccess("Perfil actualizado");

        store.dispatch(setUserData(response.data));
        store.log();

        this.log.msg("actualizando perfil\n");
      },
      (error) =>
        this.errorsHandler(error, () => this.unsafeUpdateUserData(form))
    );
  };
}

export default Controller_Profile;
