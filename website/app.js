/* Global Variables */

/* Function to GET Web API Data*/

/* Function to POST data */

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
        const response = await fetch("/weather", config);
        const newData = await response.json();
        console.log("Data coming from server:", newData);
        return newData;
    } catch (error) {
        console.log("error:", error);
    }
};

function updateUI(data) {
    console.log(data);
    document.getElementById("date").innerText = `Today's date is ${newDate}`;
    document.getElementById(
        "temp"
    ).innerText = `Temperature for zip code is ${data.temperature} fahrenheit`;
    document.getElementById(
        "content"
    ).innerText = `The user's feeling: ${data.feelings}`;
}

/* Function called by event listener */

document.getElementById("generate").addEventListener("click", submission);

const zipInput = document.getElementById("zip");
const feelingsInput = document.getElementById("feelings");

// Event listener to add function to existing HTML DOM element

async function submission() {
    const zipValue = zipInput.value;
    const feelingsValue = feelingsInput.value;

    const result = await ajax(`/weather`, "POST", {
        zip: zipValue,
        feelings: feelingsValue
    });
    updateUI(result);
}

let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();