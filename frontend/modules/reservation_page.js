import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
try{
 const response = await fetch(config.backendEndpoint+"/reservations/");
 const json = await response.json();
 return json;
}
catch(error){
  return null;
}
  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
if(reservations.length==0){
  document.getElementById("no-reservation-banner").style.display="block";
  document.getElementById("reservation-table-parent").style.display="none";
} 
else{
  document.getElementById("no-reservation-banner").style.display="none";
  document.getElementById("reservation-table-parent").style.display="block";
}
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
 const table = document.getElementById("reservation-table")
 reservations.forEach(reservation => {
const tableRow = document.createElement("tr");
    let date = new Date(reservation.date);
    let time = new Date(reservation.time);
    let month = time.toLocaleString(undefined, { month: "long" });
    let day = time.getDate();
    let year = time.getFullYear();
    let bookTime = time.toLocaleString("en-IN").split(" ");
tableRow.innerHTML=`
<th scope="row">${reservation.id}</th>
<td>${reservation.name}</td>
<td>${reservation.adventureName}</td>
<td>${reservation.person}</td>
<td>${new Date(reservation.date).toLocaleDateString("en-IN")}</td>
<td>${reservation.price}</td>

<td>${day} ${month} ${year}, ${bookTime[1]} ${bookTime[2]}</td>

<td><div class="reservation-visit-button" id = ${reservation.id}>
<a href="../detail/?adventure=${reservation.adventure}">Visit Adventure</a></div></td>`

table.append(tableRow);
 });

}

export { fetchReservations, addReservationToTable };
