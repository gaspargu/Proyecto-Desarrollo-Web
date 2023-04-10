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
  const selectedValue = event.target.value;
  console.log(selectedValue === '1')
}


regionInput.addEventListener('change', populateComuna);

















