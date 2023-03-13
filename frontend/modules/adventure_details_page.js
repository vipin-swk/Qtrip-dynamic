import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
const url = new URLSearchParams(search);
const adventure = url.get("adventure")
// console.log(adventure);
  // Place holder for functionality to work in the Stubs
  return adventure;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
const response = await fetch(config.backendEndpoint+`/adventures/detail?adventure=${adventureId}`)
const json = await response.json();
// console.log(json);
return json;
  }
  catch(e){
return null;
  }


  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
document.getElementById("adventure-name").innerHTML=adventure.name;
document.getElementById("adventure-subtitle").innerHTML=adventure.subtitle;
document.getElementById("adventure-content").innerHTML=adventure.content;
adventure.images.forEach(image => {
  const photoGallery = document.getElementById("photo-gallery");
  let imgDiv = document.createElement("div");
  imgDiv.innerHTML=`<img src="${image}" class="activity-card-image" alt="">`
  photoGallery.append(imgDiv);
});

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const photoGallery = document.getElementById("photo-gallery");
  photoGallery.innerHTML=`<div id="carouselExampleIndicators" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="carousel-inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`
images.forEach((image, index) => {
  const crouselInner = document.getElementById("carousel-inner");
  let imgDiv = document.createElement("div");
  index==0?imgDiv.className="carousel-item active":imgDiv.className="carousel-item";
  imgDiv.innerHTML=`<img src="${image}" class="activity-card-image" alt="">`
  crouselInner.append(imgDiv);
});
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available===true){
    
    document.getElementById("reservation-panel-sold-out").style.display="none";
    document.getElementById("reservation-panel-available").style.display="block";
    document.getElementById("reservation-person-cost").textContent = adventure.costPerHead;
  }
  else{
    document.getElementById("reservation-panel-sold-out").style.display="block";
    document.getElementById("reservation-panel-available").style.display="none";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let total = adventure.costPerHead*persons;
  document.getElementById("reservation-cost").textContent = total;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById("myForm");
  const onSubmit = async (event) =>{
    event.preventDefault();
let url = config.backendEndpoint + "/reservations/new";
let formElements = form.elements;

let bodyString = JSON.stringify({
  name: formElements.name.value,
  date: formElements.date.value,
  person: formElements.person.value,
  adventure: adventure.id, 
});

try{
    const res = await fetch(url, {
    method: "POST",
    body : bodyString,
    headers: {
    "Content-Type": "application/json",
    },
    });

    if(res.ok) {
      alert("Success!")
      window.location.reload();
    }else{
      let data = await res.json();
      alert("Failed");
    }
}catch(error){
  console.log(error);
  alert("Failed- fetch call resulted in error");
}
}
  form.addEventListener("submit", onSubmit );

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let banner = document.getElementById("reserved-banner")
  adventure.reserved==false? banner.style.display="none": banner.style.display= "block";

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
