const fetch = require("node-fetch");

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const API_ENDPOINT = "http://api.openweathermap.org/data/2.5/weather";

exports.handler = async(event, context) => {
    const { zipCode } = event.queryStringParameters;
    const weatherURL = `${API_ENDPOINT}?zip=${zipCode},us&appid=${WEATHER_API_KEY}`
    const fetchWeatherApi = fetch(weatherURL, { headers: { Accept: "application/json" } });
    return fetchWeatherApi
        .then((response) => response.json())
        .then((data) => {

            console.log('UUUU', data);
            return {
                statusCode: 200,
                body: JSON.stringify(data),
            }
        })
        .catch((error) => ({ statusCode: 422, body: String(error) }));
};