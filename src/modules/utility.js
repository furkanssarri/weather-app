import { setUserInput, getUserInput, requestData } from "./logic";

export function listenForm(form, e) {
   e.preventDefault();
   
   const userInput = form.querySelector("#search").value.trim();
   setUserInput(userInput);
   requestData(getUserInput());
}

export function capitilizeFirstLetter(text) {
   if (typeof text !== "string" || text.length === 0) {
      return "";
   }
   return text.charAt(0).toLocaleUpperCase("TR") + text.slice(1);
}