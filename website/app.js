const weatherEndpoint = "/.netlify/functions/weather";

const generateButton = document.getElementById("generate");
const resultsPanel = document.getElementById("results_panel");
const zipInput = document.getElementById("zip");
const feelingsInput = document.getElementById("feelings");

let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

document.addEventListener('DOMContentLoaded', function() {
    generateButton.style.display = 'block';
    resultsPanel.style.display = 'none';
}, false);


/* Function called by event listener */

generateButton.addEventListener("click", submission);

// Event listener to add function to existing HTML DOM element

async function submission() {
    const zipValue = zipInput.value;
    const feelingsValue = feelingsInput.value;

    console.log('zip', zipValue)
    const dataFromBackend = await fetchBackend(weatherEndpoint, "POST", {
        zip: zipValue,
        feelings: feelingsValue
    });
    updateUI(dataFromBackend);
}

// function for calling backend call to weather API

const fetchBackend = async(url = "", method = "GET", data) => {
    const config = {
        method,
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        }
    };
    if (data) {
        config.body = JSON.stringify(data);
    }
    try {
        const weatherResponse = await fetch(weatherEndpoint, config);
        const weatherData = await weatherResponse.json();
        console.log("Data coming from server:", weatherData);
        return weatherData;
    } catch (error) {
        console.log("error:", error);
    }
};

// function to show results panel on UI

const toggleResultPanelDisplay = () => {
    generateButton.style.display = 'none';
    resultsPanel.style.display = 'block';
}


function updateUI(weatherData) {
    toggleResultPanelDisplay();
    document.getElementById("date").innerText = `Today's date is ${newDate}`;
    document.getElementById(
        "temp"
    ).innerText = `Temperature for zip code: ${weatherData.zip} is ${weatherData.main.temp} fahrenheit`;
    document.getElementById(
        "content"
    ).innerText = `The user's feeling: ${weatherData.feelings}`;
}