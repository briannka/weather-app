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
    method: 'GET',
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
// const testData = '/weather/28329/testing'
// postData(testData, {zip: 28329, feelings: 'this is how i feel'})
// postData('/weather/zip=?/feelings=?', {zip: 67493, feelings: 'why isn\'t this working'})

/* Function to GET Project Data */
document.getElementById('generate').addEventListener('click', submission);

const zipInput = document.getElementById('zip');
const feelingsInput = document.getElementById('feelings');

function submission() {
    const zipValue = zipInput.value;
    const feelingsValue = feelingsInput.value;
    postData(`/weather/${zipValue}/${feelingsValue}`);
}