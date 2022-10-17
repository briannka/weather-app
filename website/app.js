const weatherEndpoint = "/.netlify/functions/weather";

let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();


const ajax = async(url = "", method = "GET", data) => {
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

function updateUI(weatherData) {
    document.getElementById("date").innerText = `Today's date is ${newDate}`;
    document.getElementById(
        "temp"
    ).innerText = `Temperature for zip code: ${weatherData.zip} is ${weatherData.main.temp} fahrenheit`;
    document.getElementById(
        "content"
    ).innerText = `The user's feeling: ${weatherData.feelings}`;
}

/* Function called by event listener */

document.getElementById("generate").addEventListener("click", submission);

const zipInput = document.getElementById("zip");
const feelingsInput = document.getElementById("feelings");

// Event listener to add function to existing HTML DOM element

async function submission() {
    const zipValue = zipInput.value;
    const feelingsValue = feelingsInput.value;

    console.log('zip', zipValue)
    const dataFromBackend = await ajax(weatherEndpoint, "POST", {
        zip: zipValue,
        feelings: feelingsValue
    });
    updateUI(dataFromBackend);
}