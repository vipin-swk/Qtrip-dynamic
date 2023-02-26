import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
const response = await fetch(`http://3.110.5.223:8082/cities`);
const json= await response.json();
return json;}
catch{
  return null;
}
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const data= document.getElementById("data");
  const card= document.createElement("div");
  card.className="city col-12 col-md-6 col-xl-3 mb-4"
  card.innerHTML= `<a id="${id}" href="./pages/adventures/?city=${id}">
  <div class="tile">
    <div class="tile-text text-center text-white">
      <h5>${city}</h5>
      <p>${description}</p>
    </div>
    <img class="img-responsive" src="${image}" alt="${city}">
  </div></a>`
  data.append(card);

}

export { init, fetchCities, addCityToDOM };
