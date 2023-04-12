import { data } from './region_comuna.js';

let data_regiones = data.regiones


let regionInput = document.getElementById("region")
let comunaInput = document.getElementById("comuna")

let myForm = document.forms["myForm"];

let confirmationBox = document.getElementById("confirma-box");
let confirmationMessageElem = document.getElementById("confirma-msg");

let submitBtn = document.getElementById("envio");


// function to populate a select input with data in a json 
const populateSelect = (select, data) => {
    let keys = Object.keys(data[0])          // keys of the json data
    for (let i = 0; i < data.length; i++) {
      // populate select element with the data
      select.innerHTML = select.innerHTML +
        '<option value="' + data[i][keys[0]] + '">' + data[i][keys[1]] + '</option>';
    }
  }

populateSelect(regionInput,data_regiones);

// recive el string con el valor de la region elegida por el usuario y popula el select de comuna 
// con las comunas correspondiente
const populateComuna = (event) => {
  for (let i = comunaInput.options.length - 1; i > 0; i--) {
    comunaInput.options[i].remove();
  }
  let selectedValue = parseInt(event.target.value);
  let region_object = data_regiones.find(r => r.id === selectedValue)
  if (region_object != undefined) {
    let comunas = region_object.comunas
    populateSelect(comunaInput,comunas)
  }
}

regionInput.addEventListener('change', populateComuna);

const validateFecha = (fecha) => {
  if (!fecha) return false;
  let re = /^((19|20|21|22)\d{2})\-(0[1-9]|1[0-2])\-(0[1-9]|1\d|2\d|3[01])$/;
  let formatValid = re.test(fecha);

  let current_date = new Date();
  let current_year = current_date.getFullYear();
  let current_month = current_date.getMonth()+1;
  let current_day = current_date.getDate();

  if (formatValid) {
    let year = parseInt(fecha.substring(0,4))
    let month = parseInt(fecha.substring(5,7))
    let day = parseInt(fecha.substring(8,10))

    if (year > current_year) return true;
    if (year < current_year) return false;
    if (month > current_month) return true;
    if (month < current_month) return false;
    if (day >= current_day) return true;
    if (day < current_day) return false;
  }

  return formatValid
}

const validateSimple = (campo) => {
  if (!campo) {
    return false;
  } else {
    return true;
  }
}

const validateOpcional = (campo) => true

const validateTipo = (tipo) => {
  if (!tipo) return false;
  let optionsValid = (tipo == 'fruta') || (tipo == 'verdura') || (tipo == 'otro');

  return optionsValid;
};

const validateFoto = (files) => {
  if (!files) return false;

  // number of files validation
  let lengthValid = 1 <= files.length && files.length <= 3;

  // file type validation
  let typeValid = true;

  for (const file of files) {
    // file.type should be "image/<foo>" or "application/pdf"
    let fileFamily = file.type.split("/")[0];
    typeValid &&= fileFamily == "image" || file.type == "application/pdf";
  }

  // return logic AND of validations.
  return lengthValid && typeValid;
};

const validateNombre = (nombre) => {
  if (!nombre) return false;
  // length validation
  let lengthValid = (nombre.length >= 3) && (nombre.length <= 80);

  // return logic AND of validations.
  return lengthValid;
};

const validateEmail = (email) => {
  if (!email) return false;
  // length validation
  let lengthValid = email.length > 15;

  // format validation
  let re = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  let formatValid = re.test(email);

  // return logic AND of validations.
  return lengthValid && formatValid;
};

const validateCelular = (phoneNumber) => {
  if (!phoneNumber) return true;
  // length validation
  let lengthValid = phoneNumber.length >= 8;

  // format validation
  let re = /^[0-9]+$/;
  let formatValid = re.test(phoneNumber);

  // return logic AND of validations.
  return lengthValid && formatValid;
};

const modifyForm = () => {
  if (typeof(confirmationBox.buttonNo) != 'undefined' && confirmationBox.buttonNo != null) {
    buttonNo.remove()
    buttonSi.remove()
  }
}


const validateForm = () => {
  // get elements from DOM by using form's name.
  let region = myForm["region"].value;
  let comuna = myForm["comuna"].value;
  let calle_numero = myForm["calle-numero"].value;
  let tipo = myForm["tipo"].value;
  let cantidad = myForm["cantidad"].value;
  let fecha = myForm["fecha-disponibilidad"].value;
  let descripcion = myForm["descripcion"].value;
  let condiciones = myForm["condiciones"].value;
  let foto = myForm["foto"].files;
  let nombre = myForm["nombre"].value;
  let email = myForm["email"].value;
  let celular = myForm["celular"].value;

  
  // validation auxiliary variables and function.
  let invalidInputs = [];
  let isValid = true;
  const setInvalidInput = (inputName) => {
    invalidInputs.push(inputName);
    isValid &&= false;
  };

  // validation logic
  if (!validateSimple(region)) {
    setInvalidInput("Región");
  }
  if (!validateSimple(comuna)) {
    setInvalidInput("Comuna");
  }
  if (!validateSimple(calle_numero)) {
    setInvalidInput("Calle y número");
  }
  if (!validateTipo(tipo)) {
    setInvalidInput("Tipo");
  }
  if (!validateSimple(cantidad)) {
    setInvalidInput("Cantidad");
  }
  if (!validateFecha(fecha)) {
    setInvalidInput("Fecha disponibilidad");
  }
  if (!validateOpcional(descripcion)) {
    setInvalidInput("Descripción");
  }
  if (!validateOpcional(condiciones)) {
    setInvalidInput("Condiciones para retirar");
  }
  if (!validateFoto(foto)) {
    setInvalidInput("Foto donación");
  }
  if (!validateNombre(nombre)) {
    setInvalidInput("Nombre donante");
  }
  if (!validateEmail(email)) {
    setInvalidInput("Email");
  }
  if (!validateCelular(celular)) {
    setInvalidInput("Celular");
  }

  // finally display validation
  let validationBox = document.getElementById("val-box");
  let validationMessageElem = document.getElementById("val-msg");
  let validationListElem = document.getElementById("val-list");

  let regresaBox = document.getElementById("Si-box");

  if (!isValid) {
    validationListElem.textContent = "";
    // add invalid elements to val-list element.
    for (let i = 0; i < invalidInputs.length; i++) {
      let listElement = document.createElement("li");
      listElement.innerText = invalidInputs[i];
      validationListElem.append(listElement)
    }
    // set val-msg
    validationMessageElem.innerText = "Los siguiente campos son inválidos:";

    // make validation prompt visible
    validationBox.hidden = false;
  } else {
    confirmationMessageElem.innerText = "¿Confirma que desea agregar esta donación?";
    if (!document.getElementById('si-confirma')) {
      const buttonSi = document.createElement('button');
      buttonSi.setAttribute('type', 'button');
      buttonSi.setAttribute('id', 'si-confirma');
      buttonSi.textContent = 'Sí, confirmo';

      const buttonNo = document.createElement('button');
      buttonNo.setAttribute('type', 'button');
      buttonNo.setAttribute('id', 'no-confirma');
      buttonNo.textContent = 'No, quiero volver al formulario';

      confirmationBox.appendChild(buttonSi);
      confirmationBox.appendChild(buttonNo);

      confirmationBox.hidden = false;
      validationBox.hidden = true;

      buttonSi.addEventListener("click", () => {
        submitBtn.hidden = false
        buttonSi.remove()
        buttonNo.remove()
        regresaBox.hidden = false;
      });
      buttonNo.addEventListener("click", () => {
        submitBtn.hidden = false
        buttonSi.remove()
        buttonNo.remove()
        validationBox.hidden = true
        confirmationBox.hidden = true
      } );
    }

  }
};


submitBtn.addEventListener('click', validateForm);
myForm.addEventListener('change', modifyForm);