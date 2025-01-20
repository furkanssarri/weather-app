import { displayWeather } from "./render";
import { capitilizeFirstLetter } from "./utility";

const _appState = {
   userInput: "",
   weatherData: {},
   units: "",
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

export function setUnitGroup(value) {
   _appState.units = value;
}

export function getUnitGroup() {
   return _appState.units;
}

export async function requestData() {
   if (getWeatherData()) {
      setWeatherData("");
   }
   const apiKey = "JSCT6M8HX6GWLVH6HNTKWG94C";
   let locale =  getUserInput();
   let unitGroup = "metric";
   const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locale}?unitGroup=${unitGroup}&key=${apiKey}&contentType=json`;

   try {
      const response = await fetch(url, { mode: "cors" });
      const weatherData = await response.json();
      setWeatherData({
         icon: weatherData.currentConditions.icon,
         address: capitilizeFirstLetter(weatherData.address),
         temp: weatherData.currentConditions.temp,
         condition: weatherData.currentConditions.conditions,
         feelslike: weatherData.currentConditions.feelslike,
         sunrise: weatherData.currentConditions.sunrise,
         sunset: weatherData.currentConditions.sunset,
      });
   } catch (err) {
      console.log(err);
   }
   displayWeather();
}
