import { data } from './region_comuna.js';

let data_regiones = data.regiones
let region = document.getElementById("region")

const populateSelect = (select, data) => {
    for (let i = 0; i < data.length; i++) {
      // populate select element with json.
      select.innerHTML = select.innerHTML +
        '<option value="' + data[i]["id"] + '">' + data[i]["nombre"] + '</option>';
    }
  }

populateSelect(region,data_regiones);















