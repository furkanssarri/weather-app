import { displayWeather } from "./render";

const _appState = {
   userInput: "",
   weatherData: {},
};

export function setUserInput(input) {
   _appState.userInput = input;
}

export function getUserInput() {
   return _appState.userInput;
}

export function setWeatherData(dataObj) {
   _appState.weatherData = dataObj;
}

export function getWeatherData() {
   return _appState.weatherData;
}

export async function requestData(input) {
   const apiKey = "JSCT6M8HX6GWLVH6HNTKWG94C";
   let locale =  getUserInput();
   let unitGroup = "metric";
   const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locale}?unitGroup=${unitGroup}&key=${apiKey}&contentType=json`;

   try {
      const response = await fetch(url, { mode: "cors" });
      const weatherData = await response.json();
      console.log(weatherData)
      setWeatherData({
         locale: getUserInput(),
         address: weatherData.address,
         description: weatherData.description,
         condition: weatherData.currentConditions.conditions,
         feelslike: weatherData.currentConditions.feelslike,
         humidity: weatherData.currentConditions.humidity,
         icon: weatherData.currentConditions.icon,
         precipprob: weatherData.currentConditions.precipprob,
         preciptype: weatherData.currentConditions.preciptype,
         temp: weatherData.currentConditions.temp,
         tempmax: weatherData.currentConditions.tempmax,
         tempmin: weatherData.currentConditions.tempmin,
         sunrise: weatherData.currentConditions.sunrise,
         sunset: weatherData.currentConditions.sunset,
         windspeed: weatherData.currentConditions.windspeed,
      });
   } catch (err) {
      console.log(err);
   }
   const stateData = getWeatherData();
   displayWeather(stateData);
}
