"use strict";
//RECOJO
const btn = document.querySelector(".js-button");
const searchInput = document.querySelector(".js-search");
let searchValue = "";

// "Cogemos el valor del imput de texto para pasarselo a la llamada de la Api"
/* const getValueFromInput = function() {
  const searchValue = searchInput.value;
  getDataFromServer(searchValue);
}; */

/* const getDataFromServer = function(ev) {
  ev.preventDefault();
  return fetch(`http://api.tvmaze.com/search/shows?q=${searchInput.value}`)
  .then(response => response.json())
  .then(data => {
    console.log("Fetch data from server and return it as JSON >>> Return", data);
  }
}; */

const getDataFromServer = () => {
  return fetch(`http://api.tvmaze.com/search/shows?q=${searchInput.value}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      //data = formatData(data);
      //saveDataInSeries(data);
      //paintSeries();
      // listenPalettes();
      // setPalettesIntoLocalStorage();
    });
};
btn.addEventListener("click", getDataFromServer);
//FORMATEO Y GUARDO
let result = [];
const formatData = function() {
  console.log(
    "Guardamos en una array las series con los valores de titulo e imagen"
  );
  for (const element of data.result) {
    result.push({
      name: element.show.name.result
    });
  }
};
//console.log("Recogemos los valores del input y los guardamos en una constante");
//console.log("Pedimos los datos a la api con un Fetch y los pasamos a JSON");

//PINTO
const paintShows = function() {
  console.log("Pintamos en el DOM el resultado de la busqueda");
};
//ESCUCHO

const listenShows = function() {
  console.log("Escuchamos en donde hacemos click");
};

//LEO
const getActualShows = function() {
  console.log("Te dice que serie esta seleccionada");
};

const handleClick = function() {
  console.log(
    "generamos la función a partir del click anterior, o sea la metemos en favoritos o no"
  );
};

const isFavoriteShow = function() {
  console.log("Leemos si la serie está en favorito o no");
};

const addFavorite = function() {
  console.log("Añadimos a la lista favoritos si no está");
};

const removeFavorite = function() {
  console.log("eliminamos de la lista de favoritos");
};
