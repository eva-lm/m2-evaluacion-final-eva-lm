"use strict";
//RECOJO
const btn = document.querySelector(".js-button");
const searchInput = document.querySelector(".js-search");
//let shows = [];
let result = [];

const getDataFromServer = () => {
 result = [];
  return fetch(`http://api.tvmaze.com/search/shows?q=${searchInput.value}`)
    .then(response => response.json())
    .then(data => {
      formatData(data);
      //saveData(data);
      paintShows();
      //console.log(data);
      // listenPalettes();
      // setPalettesIntoLocalStorage();
    });
};
//FORMATEO Y GUARDO

const formatData = function(data) {
  //console.log(data);
  for (const item of data) {
    if (item.show.image === null) {
      result.push({
        name: item.show.name,
        image:"https://via.placeholder.com/210x295/ffffff/666666/?text=TV"
      });
    } else {
    result.push({
      name: item.show.name,
      image: item.show.image.medium
    });
  }
  }
  //console.log("Pedimos los datos a la api con un Fetch y los pasamos a JSON");
  /*   console.log(
    "Guardamos en una array las series con los valores de titulo e imagen"
  ); */
  console.log(result);
  return result;
};

/* const saveData = function(data) {
  result = data;
}; */

//PINTO

const paintShows = function() {
  const jsUl = document.querySelector(".js-ul");
  jsUl.innerHTML = "";
  for (let serieIndex = 0; serieIndex < result.length; serieIndex++) {
    jsUl.innerHTML += `<li class="js-li">${result[serieIndex].name}</li><li class="js-li"><img src=${result[serieIndex].image}></li>`;
  }
 
};

//ESCUCHO
const handleClick = function() {
  console.log(
    "generamos la función a partir del click anterior, o sea la metemos en favoritos o no"
  );
  const serieIndex = getClickedShows(ev);
  if (isFavoriteShow(serieIndex)) {
      removeFavorite(serieIndex);
  } else {
      addFavorite(serieIndex);
  }
  paintShows();
  listenShows();
};

const listenShows = function() {
  console.log("Escuchamos en donde hacemos click");
  const serieElements = document.querySelectorAll(".js-li");
    for (const serieElement of serieElements) {
        serieElement.addEventListener("click", handleClick);
    }
};

//LEO
const getClickedShows = function(ev) {
  const currentTarget = ev.currentTarget;
  const clickedSerieIndex = parseInt(currentTarget.dataset.index);
  console.log("Te dice que serie esta seleccionada");
  return clickedSerieIndex;
};



const isFavoriteShow = function() {
  console.log("Leemos si la serie está en favorito o no");
  
};


const addFavorite = function() {
  console.log("Añadimos a la lista favoritos si no está");
  serieIndex.classList.add("selected");

};

const removeFavorite = function() {
  console.log("eliminamos de la lista de favoritos");
  serieIndex.classList.add("unselected");

};
btn.addEventListener("click", getDataFromServer);
