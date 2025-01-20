import { setUserInput, getUserInput, setUnitGroup, requestData } from "./logic";

export function listenForm(form, e) {
   e.preventDefault();
   const searchBar = form.querySelector("#search");
   const userInput = searchBar.value.trim();
   setUserInput(userInput);
   requestData(getUserInput());

   const unitInput = form.querySelector("#unit-select").value;
   setUnitGroup(unitInput);

   searchBar.value = "";
   searchBar.autofocus = false;
   
}

export function capitilizeFirstLetter(text) {
   if (typeof text !== "string" || text.length === 0) {
      return "";
   }
   return text.charAt(0).toLocaleUpperCase("TR") + text.slice(1);
}