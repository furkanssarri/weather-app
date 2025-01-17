import { listenForm, capitilizeFirstLetter } from "./utility";


function createForm() {
   const form = document.createElement("form");
   const searchBar = document.createElement("input");
   searchBar.type = "text";
   searchBar.id = "search";

   const searchBtn = document.createElement("button");
   searchBtn.textContent = "Search";
   searchBtn.classList.add("btn", "btn-primary", "search-btn");

   form.append(searchBar, searchBtn);
   document.body.appendChild(form);

   form.addEventListener("submit", (e) => listenForm(form, e));
}

export function displayWeather(data) {

   // Render methods will go here

   console.log(`The weather report for ${capitilizeFirstLetter(data.locale)}: ${data.condition}. The temperature is ${data.temp} degrees celcius; and it feels like ${data.feelslike} degrees celcius. The humidity is ${data.humidity}%.`);
}

export function render() {
   createForm();
}
