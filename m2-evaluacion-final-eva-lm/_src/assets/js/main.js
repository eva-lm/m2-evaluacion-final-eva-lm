"use strict";
//RECOJO
const btn = document.querySelector(".js-button");
const searchInput = document.querySelector(".js-search");
//let shows = [];
let favorites = [];
let series = [];



function setLocalStorage () {
  localStorage.setItem('favorites', JSON.stringify(series));
};
function getLocalStorage () {
  return JSON.parse(localStorage.getItem('favorites'));

}

const getDataFromServer = () => {
 series = [];
  return fetch(`http://api.tvmaze.com/search/shows?q=${searchInput.value}`)
    .then(response => response.json())
    .then(data => {
      formatData(data);
      paintShows();
      //console.log(data);
      listenShows();
      paintFavorites();
      setLocalStorage();
    });
};
//FORMATEO Y GUARDO

const formatData = function(data) {
  //console.log(data);
  for (const item of data) {
    if (item.show.image === null) {
      series.push({
        name: item.show.name,
        image:"https://via.placeholder.com/210x295/ffffff/666666/?text=TV",
        id: item.show.id
      });
    } else {
    series.push({
      name: item.show.name,
      image: item.show.image.medium,
      id: item.show.id
    });
  }
  }
  //console.log("Pedimos los datos a la api con un Fetch y los pasamos a JSON");
  /*   console.log(
    "Guardamos en una array las series con los valores de titulo e imagen"
  ); */
};

//PINTO

const paintShows = function() {
  const jsUl = document.querySelector(".js-ul");
  let text = "";
  for (let serieIndex = 0; serieIndex < series.length; serieIndex++) {
    text += `<li class="js-li" data-index="${serieIndex}">
      ${series[serieIndex].name}
      <img src="${series[serieIndex].image}">
    </li>`;
  }
 jsUl.innerHTML = text;
 console.log(jsUl);
 
};

//ESCUCHO

function listenShows() {
  const seriesList = document.querySelectorAll(".js-li");
  console.log(seriesList);
  for (let serieIndex = 0; serieIndex < series.length; serieIndex++) {
  seriesList[serieIndex].addEventListener("click", getClikedShows);
}
};

//LEO
function getClikedShows(ev) {
 //Te dice que serie esta seleccionada
  const index = parseInt(ev.currentTarget.dataset.index);
  if (isFavoriteShow(index)) {
    
    removeFavorite(index)
    // borro
  } else {
   
    addFavorite(index);
    // añado
  }
  paintShows();
  listenShows();
  console.log(favorites);
};

const isFavoriteShow = function(index) {
  const serie = series[index];
  for (const favorite of favorites) {
    if (favorite.id === serie.id) {
      //return true;
      favorite.splice(favoriteIndex, 1);
      serie.classList.toggle("selected");
    }
  }
  //return false;
};

function addFavorite(index){
  favorites.push(series[index]);
  paintFavorites();
};

function paintFavorites() {
const favoriteList = document.querySelector(".js-favorite");
let addText = "";
for (let favoriteIndex = 0; favoriteIndex < favorites.length; favoriteIndex++) {
  addText += `<li class="item-favorite" data-index="${favoriteIndex}">
  ${favorites[favoriteIndex].name}
    <img src="${favorites[favoriteIndex].image}">
  </li>`;
}
favoriteList.innerHTML = addText;
getLocalStorage();
};

const removeFavorite = function(index) {
  for (const favorite of favorites) {
    favorite.splice(favoriteIndex, 1);
  }
};

function handleClick (ev) {
  const serieIndex = getClikedShows(ev);
  if (isFavoriteShow(serieIndex)) {
    removeFavorite(series);
  } else {
    addFavorite(series).classList.add("selected");
  }
  paintShows();
  listenShows();
  paintFavorites();
};
btn.addEventListener("click", getDataFromServer);

