const fetch = require("node-fetch");

const API_ENDPOINT = "http://api.openweathermap.org/data/2.5/weather";
const weatherApiKey = "30345c8bb3254064fa5aa95b2598b854";


exports.handler = async(event, context) => {
    const { zipCode } = event.queryStringParameters;
    const weatherURL = `${API_ENDPOINT}?zip=${zipCode},us&appid=${weatherApiKey}`
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