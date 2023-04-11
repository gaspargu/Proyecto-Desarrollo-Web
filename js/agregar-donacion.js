import { data } from './region_comuna.js';

let data_regiones = data.regiones


let regionInput = document.getElementById("region")
let comunaInput = document.getElementById("comuna")
let callenumeroInput = document.getElementById("calle-numero")


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

const validatePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return true;
  // length validation
  let lengthValid = phoneNumber.length >= 8;

  // format validation
  let re = /^[0-9]+$/;
  let formatValid = re.test(phoneNumber);

  // return logic AND of validations.
  return lengthValid && formatValid;
};

const validateFiles = (files) => {
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

const validateForm = () => {
  // get elements from DOM by using form's name.
  let myForm = document.forms["myForm"];
  let email = myForm["email"].value;
  let phoneNumber = myForm["celular"].value;
  let files = myForm["foto"].files;

  // validation auxiliary variables and function.
  let invalidInputs = [];
  let isValid = true;
  const setInvalidInput = (inputName) => {
    invalidInputs.push(inputName);
    isValid &&= false;
  };

  // validation logic
  if (!validateEmail(email)) {
    setInvalidInput("Email");
  }
  if (!validatePhoneNumber(phoneNumber)) {
    setInvalidInput("Celular");
  }
  if (!validateFiles(files)) {
    setInvalidInput("Picture(s)");
  }



  // finally display validation
  let validationBox = document.getElementById("val-box");
  let validationMessageElem = document.getElementById("val-msg");
  let validationListElem = document.getElementById("val-list");

  if (!isValid) {
    validationListElem.textContent = "";
    // add invalid elements to val-list element.
    for (let i = 0; i < invalidInputs.length; i++) {
      let listElement = document.createElement("li");
      listElement.innerText = invalidInputs[i];
      validationListElem.append(listElement)
    }
    // set val-msg
    validationMessageElem.innerText = "Los siguiente campos son invalidos:";

    // make validation prompt visible
    validationBox.hidden = false;
  } else {
    myForm.submit();
  }
};

let submitBtn = document.getElementById("envio");
submitBtn.addEventListener("click", validateForm);

















