import swal from 'sweetalert2';

class Alerts {

    //alerta normal
    showConfirm = (message, title = 'Mensaje', backdropDismiss = true, onOk = null, onCancel = null) => {
        swal.fire({
            title: title,
            text: message,
            type: 'question',
            showConfirmButton: true,
            showCancelButton: true,
            allowOutsideClick: backdropDismiss,
            buttonsStyling: false,
            confirmButtonText: 'Sí, continuar <i class="fa fa-check"></i>',
            confirmButtonClass: 'btn btn-primary',
            cancelButtonText: 'cancelar <i class="fa fa-times"></i>',
            cancelButtonClass: 'btn btn-secundary',
        }).then(result => {
            if (result.value) {
                if (onOk !== null) onOk();
            } else {
                if (onCancel !== null) onCancel();
            }
        });
    }

    //alerta normal
    showAlert = (message, title = 'Mensaje', backdropDismiss = true, onDidDismiss = null) => {
        swal.fire({
            title: title,
            text: message,
            type: 'info',
            showConfirmButton: true,
            buttonsStyling: false,
            allowOutsideClick: backdropDismiss,
            confirmButtonClass: 'btn btn-primary',
            onAfterClose: (result) => {
                if (onDidDismiss !== null) onDidDismiss(result)
            }
        });
    }

    //alerta normal
    showWarning = (message, title = 'Mensaje', backdropDismiss = true, onDidDismiss = null) => {
        swal.fire({
            title: title,
            text: message,
            type: 'warning',
            showConfirmButton: true,
            buttonsStyling: false,
            allowOutsideClick: backdropDismiss,
            confirmButtonClass: 'btn btn-primary',
            onAfterClose: (result) => {
                if (onDidDismiss !== null) onDidDismiss(result)
            }
        });
    }

    //alerta normal
    showSuccess = (message, title = 'Perfecto!') => {
        swal.fire({
            title: title,
            text: message,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-primary',
        });
    }

    //alerta normal
    showToast = (message) => {
        swal.fire({
            title: message,
            type: 'success',
            position: "bottom",
            timer: 3000,
            toast: true,
            showConfirmButton: false,
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-primary'
        });
    }

    //alerta de error de internet
    showErrorConexion = (retryHandler = null, isStrict) => {
        swal.fire({
            title: "Error de conexión",
            text: 'Revise su conexión a internet',
            type: 'error',
            showConfirmButton: true,
            showCancelButton: !isStrict,
            allowOutsideClick: !isStrict,
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-primary',
            cancelButtonClass: 'btn btn-secondary',
            confirmButtonText: 'reintentar <i class="fa fa-redo"></i>',
            cancelButtonText: 'cancelar  <i class="fa fa-times"></i>'

        }).then(result => {
            if (result.value) {
                if (retryHandler !== null) retryHandler();
            }
        });;
    }

    //aleta de error desconocido
    showErrorUnknow = (retryHandler = null) => {
        swal.fire({
            title: "Error",
            text: 'Ups!... error desconocido',
            type: 'error',
            showConfirmButton: true,
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-primary',
            cancelButtonClass: 'btn btn-secondary',
            confirmButtonText: 'reintentar <i class="fa fa-redo"></i>',
            cancelButtonText: 'cancelar  <i class="fa fa-times"></i>'

        }).then(result => {
            if (result.value) {
                if (retryHandler !== null) {
                    retryHandler();
                }
            }
        });;
    }

    //dialogo de carga de contenido
    showLoading = (isShow = true, message = 'Consultando...') => {
        if (isShow) {
            swal.fire({
                allowOutsideClick: false,
                // title: message, 
                html: '<div class="pt-1 mx-auto lds-dual-ring"></div><h2 class="text-default">' + message + '</h2>',
                showConfirmButton: false,
                // onBeforeOpen: () => { 
                //     swal.showLoading() 
                // } 
            });
        } else {
            swal.close();
        }
    }


    setUplodingPercentage = percentage => {
        percentage = parseInt(percentage);
        document.getElementById("swal-progress-label").innerText = percentage + "%";
        document.getElementById("swal-progress-bar").style.width = percentage + "%";
    }

    showUploding = (isShow = true, message = 'Subiendo...') => {
        if (isShow) {
            swal.fire({
                allowOutsideClick: false,
                // title: message, 
                html: '<h2 class="display-4 text-default mb-0">' + message + '</h2>'
                    + '<div class="">'
                    + '<br></br>'
                    + '<span id="swal-progress-label" class="mr-2">0%</span>'
                    + '<div>'
                    + '<div  class="progress" style="width: 100%;height: 10px">'
                    + '<div id="swal-progress-bar" class="progress-bar bg-gradient-info" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>'
                    + '</div>'
                    + '</div>'
                    + '</div>',
                showConfirmButton: false,
                showCancelButton: true,
                buttonsStyling: false,

                cancelButtonText: 'cancelar  <i class="fa fa-times"></i>',
                cancelButtonClass: 'btn btn-secondary',
                // onBeforeOpen: () => { 
                //     swal.showLoading() 
                // } 
            });
        } else {
            swal.close();
        }
    }
}

export default Alerts;