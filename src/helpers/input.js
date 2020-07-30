const focusHandler = e => {
  e.preventDefault();
  e.target.parentNode.classList.add("focused");
  e.target.parentNode.classList.add("mi-shadow");
}

const blurHandler = e => {
  e.preventDefault();
  e.target.parentNode.classList.remove("mi-shadow");
  e.target.parentNode.classList.remove("focused");
}

const focusHandler2 = e => {
  e.preventDefault();
  e.target.classList.add("focused");
  e.target.classList.add("mi-shadow");
}

const blurHandler2 = e => {

  e.target.classList.remove("mi-shadow");
  e.target.classList.remove("focused");
}

const nameChangedHandler = e => {

  e.preventDefault();
  var letras = "abcdefghijklmnñopqrstuvwxyzABCDEFGJHIJKLMNOPQRSTUVWXYZáéíóúÁÉÍÓÚ ";

  const str = e.target.value;
  var aux = e.target.selectionStart;
  var newStr = "";

  for (var i = 0; i < str.length; i++) {
    var charCode = str.charCodeAt(i);

    if (letras.indexOf(String.fromCharCode(charCode)) !== -1) {
      if (str.charCodeAt(i) !== 32) {
        if (str.charCodeAt(i - 1) === 32 || i === 0) {
          newStr = newStr + String.fromCharCode(charCode).toUpperCase();
        } else {
          newStr = newStr + String.fromCharCode(charCode).toLowerCase();
        }
      } else if (str.charCodeAt(i - 1) !== 32) {
        newStr = newStr + String.fromCharCode(charCode)
      }
    }
  }

  e.target.value = newStr;
  e.target.selectionStart = aux;
  e.target.selectionEnd = aux;

  //validamos la longitud del texto 
  let lenght = e.target.value.trim().length;
  if (lenght < 8) {
    e.target.setCustomValidity("Alarga el texto a 8 o mas carácteres (actualmente, usas " + lenght + " caracteres)");
  } else {
    e.target.setCustomValidity("");
  }
}

const user_nameChangedHandler = e => {

  e.preventDefault();
  var letras = "abcdefghijklmnñopqrstuvwxyzABCDEFGJHIJKLMNOPQRSTUVWXYZ1234567890";

  const str = e.target.value;
  var aux = e.target.selectionStart;
  var newStr = "";

  for (var i = 0; i < str.length; i++) {
    var charCode = str.charCodeAt(i);

    if (letras.indexOf(String.fromCharCode(charCode)) !== -1) {
          newStr = newStr + String.fromCharCode(charCode).toLowerCase();
    }
  }

  e.target.value = newStr;
  e.target.selectionStart = aux;
  e.target.selectionEnd = aux;

  //validamos la longitud del texto 
  let lenght = e.target.value.trim().length;
  if (lenght < 8) {
    e.target.setCustomValidity("Alarga el texto a 8 o mas carácteres (actualmente, usas " + lenght + " caracteres)");
  } else {
    e.target.setCustomValidity("");
  }
}


const onChangeNumber = e => {

  e.preventDefault();
  var letras = "1234567890";

  const str = e.target.value;
  var aux = e.target.selectionStart;
  var newStr = "";

  for (var i = 0; i < str.length; i++) {
    var charCode = str.charCodeAt(i);

    if (letras.indexOf(String.fromCharCode(charCode)) !== -1) {
        if (str.charCodeAt(i - 1) === 32 || i === 0) {
          newStr = newStr + String.fromCharCode(charCode).toUpperCase();
        } else {
          newStr = newStr + String.fromCharCode(charCode).toLowerCase();
        }
    }
  }

  e.target.value = newStr;
  e.target.selectionStart = aux;
  e.target.selectionEnd = aux;
}


export { focusHandler, blurHandler, focusHandler2, blurHandler2, nameChangedHandler, user_nameChangedHandler, onChangeNumber }