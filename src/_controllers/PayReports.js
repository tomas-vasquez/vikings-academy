
import swal from 'sweetalert2';

import Model_PayReports from '_models/PayReports';
import Model_Users from '_models/Users';
import AutoRefresh from "_models/AutoRefresh";

import Logger from 'helpers/Logger';
import Alerts from 'helpers/Alerts'
import DB from 'helpers/db';

import store from 'store';
import { consignProduct } from 'store/users_store/actions';
import { addPayReport, deletePayReport } from 'store/pay_reports_store/actions';

import { reportsUrl } from "config";
import Controller_admin from '.';

class Controller_PayReports extends Controller_admin {

  constructor() {
    super();
    this.users = new Model_Users();
    this.payReports = new Model_PayReports();
    this.log = new Logger('Controller_PayReports', 'background:blue;color:white');
    this.alerts = new Alerts();
    this.db = new DB();
    this.autoRefresh = new AutoRefresh();
  }

  /*!
  =========================================================
  * 
  =========================================================
  */

  handle_pic_report_selected(img, _callBack) {//vemos si la imagen seleccionada es v{alida}

    if (typeof img !== "undefined") {

      if (img.size <= 41943040) {// imagenes max 5mb

        var image = new Image();//creamos un objeto dom para pintar la imagen seleccionada

        image.onload = () => {

          var max = 1200;

          var canvas = document.createElement("CANVAS");

          var width = image.width;
          var height = image.height;

          if (width > height) {
            if (width > max) {

              height = (max * height) / width;
              width = max;
            }
          } else if (height > width) {
            if (height > max) {
              width = (max * height) / width;
              height = max
            }
          } else if (height === width) {
            height = max;
            width = max;
          }
          canvas.width = width;
          canvas.height = height;

          var ctx = canvas.getContext("2d");
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, width, height);//for png background
          ctx.drawImage(image, 0, 0, width, height);

          canvas.toBlob(blob => { _callBack(blob) }, 'image/jpeg');
        }
        image.src = URL.createObjectURL(img);

      } else {
        this.alerts.showAlert('Imagen demasiado grande...');
      }
    }
  }

  /*!
  =========================================================
  * 
  =========================================================
  */

  uploadReport = (imgs, form, _myCallBack) => {

    this.alerts.showUploding(true, 'subiendo...');
    this.log.msg('subiendo reporte...');

    let formData = new FormData(form);

    for (let index = 0; index < imgs.length; index++) {
      if (imgs[index] !== null)
        formData.append("blob" + index, imgs[index].blob);
    }

    this.payReports.uploadReport(formData, progressEvent => {
      let percentage = progressEvent.loaded / (progressEvent.total / 100);
      this.alerts.setUplodingPercentage(percentage);

    }, response => {

      store.dispatch(addPayReport({ imgs, ...response.data }));
      store.log();

      this.alerts.showSuccess('Reporte de pago enviado');
      _myCallBack();

    }, error => this.errorsHandler(error, () => this.uploadReport(imgs, form, _myCallBack)));
  }


  /*!
  =========================================================
  * 
  =========================================================
  */

  deletePayReport = (report_id) => {
    this.log.msg('eliminando foto de perfil... ');

    swal.fire({
      showCloseButton: true,
      showCancelButton: true,
      buttonsStyling: false,
      type: 'question',
      title: 'Eliminar reporte de pago',
      text: '¿Está seguro de eliminar su reporte de pago?',
      confirmButtonText: 'Sí, eliminar <i className="fa fa-trash"></i>',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonText: 'cancelar <i className="fa fa-times"></i>',
      cancelButtonClass: 'btn btn-secondary',
    }).then(result => {
      if (result.value) {
        this.unsafeDeleteMyPayReport(report_id);
      }
    });
  }

  unsafeDeleteMyPayReport = (report_id) => {
    this.alerts.showLoading(true, 'borrando...');
    this.log.msg('borrando reporte...');

    this.payReports.deletePayReport(report_id, () => {

      store.dispatch(deletePayReport(report_id));
      store.log();

      this.log.msg('borrando reporte... listo! :D\n');

      this.alerts.showSuccess('Reporte de pago eliminado');

      // this.autoRefresh.updateSubscribers();

    }, error => this.errorsHandler(error, () => this.unsafeDeleteMyPayReport(report_id)));
  }

  /*!
    =========================================================
    * 
    =========================================================
    */

  aprovePayReport = (payReport, _callBack) => {

    swal.fire({
      title: "¿Aprovar este reporte de pago?",
      text: "¿Esta seguro de continuar?",
      type:"question",
      imageUrl: reportsUrl + "/" + payReport.report_url,
      showCloseButton: true,
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: 'Si, aprovar',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonText: 'cancelar',
      cancelButtonClass: 'btn btn-danger',
      footer: "<small className='text-muted'>importante: la imagen seleccionada no deve contener contenido inapropiado</small>"
    }).then(result => {
      if (result.value) {
        this.unsafeAprovePayReport(payReport, _callBack);
      }
    });
  }

  unsafeAprovePayReport = (payReport, _callBack) => {

    this.alerts.showLoading(true, 'aprovando reporte...');
    this.log.msg('aprovando reporte...');

    this.payReports.aprovePayReport(payReport.report_id, () => {

      store.dispatch(deletePayReport(payReport));
      store.dispatch(consignProduct(payReport.user_id, payReport.product));

      this.log.msg('aprovando reporte... listo! :D\n');
      this.alerts.showLoading(false);

      this.alerts.showToast('Reporte de pago aprovado');

      _callBack();

    }, error => this.errorsHandler(error, () => this.unsafeAprovePayReport(payReport, _callBack)));
  }

}

export default Controller_PayReports;