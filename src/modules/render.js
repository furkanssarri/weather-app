import { listenForm, capitilizeFirstLetter } from "./utility";
import { getWeatherData } from "./logic";
import { createIcons, icons } from "lucide";

export function render() {
   const mainArea = document.createElement("main");
   const container = document.createElement("div");
   container.classList.add("container", "pb-5");

   mainArea.appendChild(container);
   document.body.appendChild(mainArea);
   document.body.appendChild(createFooter());
   createForm();

   return container;
}

function createFooter() {
   const date = new Date().getFullYear();
   const footer = document.createElement("footer");
   const anchor = document.createElement("a");
   const icon = document.createElement("i");

   icon.classList.add("fa-brands", "fa-github");
   icon.style.marginRight = "8px";

   anchor.href = "https://github.com/furkanssarri";
   anchor.target = "_blank";
   anchor.rel = "noopener noreferrer";
   anchor.textContent = "furkanssarri";
   anchor.append(date);
   anchor.prepend(icon);

   footer.appendChild(anchor);
   return footer;
}

async function createForm() {
   const mainArea = await document.querySelector("main");
   const form = document.createElement("form");
   const searchBar = document.createElement("input");
   searchBar.type = "text";
   searchBar.id = "search";
   searchBar.classList.add("form-control", "m-2");
   searchBar.autofocus = true;

   const searchBtn = document.createElement("button");
   searchBtn.textContent = "Search";
   searchBtn.classList.add("btn", "btn-primary", "search-btn", "m-2");

   const unitSelect = document.createElement("select");
   unitSelect.id = "unit-select";
   unitSelect.classList.add("m-2", "form-select");
   const celsiusOption = document.createElement("option");
   celsiusOption.value = "metric";
   celsiusOption.textContent = "Metric";
   const fahrenheitOption = document.createElement("option");
   fahrenheitOption.value = "imperial";
   fahrenheitOption.textContent = "Imperial";

   unitSelect.append(celsiusOption, fahrenheitOption);

   form.append(unitSelect, searchBar, searchBtn);
   mainArea.appendChild(form);

   form.addEventListener("submit", (e) => listenForm(form, e));
}

export async function displayWeather() {
   const data = getWeatherData();
   const container = document.querySelector(".container");

   while (container.firstChild) {
      container.removeChild(container.firstChild);
   }

   for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
         const value = data[key];
         if (key === "icon") {
            createElements("i", key, value);
         } else if (key !== "description") {
            createElements("span", key, value);
         }
      }
   }
   await resolveBodyColor(data.icon);
}

async function resolveBodyColor(data) {
   let bodyClass;
   let icon = await data;
   switch (icon) {
      case "snow":
         bodyClass = "snow";
         break;
      case "rain":
         bodyClass = "rain";
         break;
      case "fog":
         bodyClass = "fog";
         break;
      case "cloudy":
         bodyClass = "cloudy";
         break;
      case "clear-day" || "partly-cloudy-day":
         bodyClass = "clear-day";
         break;
      case "clear-night":
         bodyClass = "clear-night";
         break;
      case "partly-cloudy-night":
         bodyClass = "clear-night";
         break;
      case "partly-cloudy-day":
         bodyClass = "clear-day";
         break;
      default:
         bodyClass = "default";
         break;
   }
   const bodyElement = document.querySelector("body");
   if (bodyElement.classList) {
      bodyElement.classList = "";
   }
   bodyElement.classList.add(bodyClass);
}

async function createElements(type, key, value) {
   const container = document.querySelector(".container");
   const element = document.createElement(type);
   if (type === "i") {
      let iconName;
      switch (value) {
         case "snow":
            iconName = "snowflake";
            break;
         case "rain":
            iconName = "cloud-rain";
            break;
         case "fog":
            iconName = "cloud-fog";
            break;
         case "wind":
            iconName = "wind";
            break;
         case "cloudy":
            iconName = "cloud";
            break;
         case "partly-cloudy-day":
            iconName = "cloud-sun";
            break;
         case "partly-cloudy-night":
            iconName = "cloud-moon";
            break;
         case "clear-day":
            iconName = "sun";
            break;
         case "clear-night":
            iconName = "moon-star";
            break;
         default:
            break;
      }
      element.setAttribute("data-lucide", iconName);
   } else {
      if (key === "feelslike") {
         element.textContent = `${capitilizeFirstLetter(key)}: ${value}`;
      } else if (key === "sunrise" || key === "sunset") {
         element.textContent = value;
         const iconElement = document.createElement("img");
         iconElement.setAttribute("data-lucide", key);
         iconElement.classList.add("me-2");
         element.prepend(iconElement);
      } else {
         element.textContent = value;
      }
   }

   element.classList.add("weather-details-item");
   element.id = key;
   container.appendChild(element);

   if (key === "icon" || key === "sunrise" || key === "sunset") {
      createIcons({ icons });
   }

   return element;
}
