/* Global Variables */

// Personal API Key for OpenWeatherMap API

// Event listener to add function to existing HTML DOM element

/* Function called by event listener */

/* Function to GET Web API Data*/

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       document.getElementById("entryHolder").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "/weather", true);
    xhttp.send();
  }
loadDoc();
/* Function to POST data */


/* Function to GET Project Data */




// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();