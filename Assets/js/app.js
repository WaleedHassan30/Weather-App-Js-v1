// Import Data From javascript logic file
import { weatherDataModel , WeatherApp , getLocationSuccess  } from './logic.js';
import { AppDesign} from './Design.js';

let selectElements = new WeatherApp();
let appDesign = new AppDesign()
// ---------------------------------

// Get City From User

// -------------------------------------
//Events
// -------------------------------------
// G1
let data ;
search.addEventListener("keydown",async function(){
    data = await weatherDataModel(selectElements.searchInput.value)
    appDesign.addWeatherCards(data)
    appDesign.changeBackgound(data)
    // if(search.value === ""){
    //   selectElements.mainCardsContainer.style.display = "none"
    // }else{
    //   selectElements.mainCardsContainer.style.display = "flex"

    // }

})
// ---------------------------------------
searchIconBtn.addEventListener("click",async function(){
    data = await weatherDataModel(selectElements.searchInput.value)
    appDesign.addWeatherCards(data)
    appDesign.changeBackgound(data)


    //G3 Event After press Search Button

})
// ---------------------------------------

// G2 on logic
window.onload = async function() {
    try {
      const data = await getLocationSuccess();
      appDesign.addWeatherCards(data)
      appDesign.changeBackgound(data)
    } catch (error) {
      console.log(error);
    }
  };

(async function(){
    let storedValue = localStorage.getItem("searchingValue");
    if (storedValue) {
      selectElements.searchInput.value = storedValue;
    }
    data = await weatherDataModel(storedValue)
    appDesign.addWeatherCards(data)
    appDesign.changeBackgound(data)

})
  
// ---------------------------------------
