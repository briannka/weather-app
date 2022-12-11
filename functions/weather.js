const fetch = require("node-fetch");

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const API_ENDPOINT = "http://api.openweathermap.org/data/2.5/weather";

exports.handler = async(event, context) => {
    const { zip, feelings } = JSON.parse(event.body);

    const weatherURL = `${API_ENDPOINT}?zip=${zip},us&appid=${WEATHER_API_KEY}&units=imperial`
    const fetchWeatherApi = fetch(weatherURL, { headers: { Accept: "application/json" } });
    return fetchWeatherApi
        .then((response) => response.json())
        .then((data) => {
            data.zip = zip;
            data.feelings = feelings;
            return {
                statusCode: 200,
                body: JSON.stringify(data),
            }
        })
        .catch((error) => ({ statusCode: 422, body: String(error) }));
};
