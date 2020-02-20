/* Global Variables */

// Personal API Key for OpenWeatherMap API

// Event listener to add function to existing HTML DOM element

/* Function called by event listener */

/* Function to GET Web API Data*/

// function loadDoc() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//       if (this.readyState == 4 && this.status == 200) {
//        document.getElementById("entryHolder").innerHTML = this.responseText;
//       }
//     };
//     xhttp.open("GET", "/weather", true);
//     xhttp.send();
//   }
// loadDoc();
/* Function to POST data */

const postData = async (url = '')=>{
    const response = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch(error) {
        console.log('error:', error);
    }
}

// //update ui
// const ui = function updateUI() {
//     const request = await fetch('/addJournal')
//     try {
//         const finalData = await request.json();
//         console.log(finalData);
//         document.getElementById('temp').innerHTML = newData[0].temp;
//         document.getElementById('content').innerHTML = newData[0].feelings;
//     } catch(error) {
//         console.log('error', error);
//     } 
// }


/* Function to GET Project Data */
document.getElementById('generate').addEventListener('click', submission);

const zipInput = document.getElementById('zip');
const feelingsInput = document.getElementById('feelings');

function submission() {
    const zipValue = zipInput.value;
    const feelingsValue = feelingsInput.value;
    postData(`/weather/${zipValue}/${feelingsValue}`, {zip: zipValue, feelings: feelingsValue});
    // updateUI();
}