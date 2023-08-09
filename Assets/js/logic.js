// global variables
let dataListValues = []
// For Classes and Functions
// Define a WeatherAPI class
class WeatherAPI{
    constructor(apiKey){
        this.apiKey = apiKey;
    }
    // Get Day Name Function
    getDayName(date){
        const [day,month,year] = date.split("-")
        const dayNumber = new Date(day,month-1,year).getDay()
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return dayNames[dayNumber]
    }
    data(data,response){
        if(response.ok){
            // Access Current Weather Data for Now
            const weatherDataCurrent = {
                lastUpdated:data.current.last_updated.split(" ")[1],
                date:data.current.last_updated.split(" ")[0],
                dayName: this.getDayName(data.current.last_updated.split(" ")[0]),
                city:data.location.name,
                tempNow:data.current.temp_c,
                tempStatus:data.current.condition.text,
                tempIcon:data.current.condition.icon.replace("//","https://"),
                wind:data.current.wind_kph,
                humidity:data.current.humidity,
                feelsLike:data.current.feelslike_c,
            } 
            const hoursArrayCurrent = [];
            // weatherDataCurrent.hours = hoursArrayCurrent



            // Access Weather Data for 3 dayes
            const weatherDataForcastArray = [];
            const hours =  [];
            data.forecast.forecastday.forEach((element,index) => {
                const weatherData = {
                    date: element.date,
                    dayName: this.getDayName(element.date),
                    maxtemp_c: element.day.maxtemp_c,
                    mintemp_c: element.day.mintemp_c,
                    maxwind_kph: element.day.maxwind_kph,
                    avghumidity: element.day.avghumidity,
                    tempStatus: element.day.condition.text,
                    tempIcon: element.day.condition.icon.replace("//","https://"),
                    sunrise: element.astro.sunrise,//.replace("AM","").replace("PM",""),
                    sunset: element.astro.sunset,//.replace("AM","").replace("PM",""),
                    hours: element.hour,
                    
                    
                    // --------------------
                };
                const hoursArray = []; // Create a new array for each iteration 
                //  get hours every 4 hours +=4
                for(let index = 0;index < element.hour.length;index+=3){ 
                    hoursArray.push(
                        {
                            time:element.hour[index].time.split(" ")[1],
                            date:element.hour[index].time.split(" ")[0],
                            temp_c:element.hour[index].temp_c,
                            status:element.hour[index].condition.text,
                            icon:element.hour[index].condition.icon.replace("//","https://"),
                            wind_kph:element.hour[index].wind_kph,
                            humidity:element.hour[index].humidity,
                            feelslike_c:element.hour[index].feelslike_c,
                            
                        },
                        // ----------------------------------------


                      )
                       
                    
                }


         

                weatherDataCurrent.hours = hoursArrayCurrent
                weatherData.hours = hoursArray
                weatherDataForcastArray.push(weatherData);
                weatherDataForcastArray
                // console.log(hoursArrayCurrent)
                
            });

           


            const weatherData = {
                current: weatherDataCurrent,
                forecast: weatherDataForcastArray,
              };
              console.log(weatherData)
            return new WeatherInfo(weatherData);
            


        }else{
        // Handle errors or return null
            return 400;

        }

    }
    async getWeatherData(city,lang){

        try{
            //  To Get Weather Data By Search City
            const url = `https://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${city}&days=3&lang=${lang}`;
            const response = await fetch(url);
             // To Get Wather Data By latitude and longitude
            const data = await response.json();
            return this.data(data,response)

        }catch (error) {
            // Handle errors or return null
            // console.error(error);
            return error;
          }
    }
    async getWeatherDataWithLocation(latitude, longitude) {
        try {
          const urlForLocation = `https://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${latitude},${longitude}&days=3`;
          const responseForLocation = await fetch(urlForLocation);
          const dataForLocation = await responseForLocation.json();
          let a = new WeatherApp();
          a.searchInput.value = dataForLocation.location.name;
      
          // Add city name to local storage // G2

          localStorage.setItem("searchingValue", dataForLocation.location.name);
      
          return this.data(dataForLocation, responseForLocation);
        } catch (error) {
          return "Error Location";
        }
      }
}
//  Define a WeatherInfo
class WeatherInfo{
    constructor(weatherData){
        this.lastUpdated = weatherData.current.lastUpdated,
        this.date =  weatherData.current.date,
        this.dayName = weatherData.current.dayName,
        this.city = weatherData.current.city,
        this.tempNow = weatherData.current.tempNow,
        this.tempStatus =weatherData.current.tempStatus,
        this.tempIcon =weatherData.current.tempIcon,
        this.wind =weatherData.current.wind,
        this.humidity =weatherData.current.humidity,
        this.feelsLike =weatherData.current.feelsLike,
        // ---------------------------------------------------
        this.forcast =weatherData.forecast
        this.hours = weatherData.hours

    }
}
  // Define Api Information
  const apiKey = "580b180bab6743eda63200547231803";
  const weatherAPI = new WeatherAPI(apiKey);
  // Get Current Location using javascript geolocation
  async function getLocationSuccess() {
    try {
      // Check if the navigator.geolocation is available
      if (navigator.geolocation) {
        // Create a promise to get the current position if resolved return current posision
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject); //  Geolocation API in JavaScript. It is used to retrieve the device's current position (latitude and longitude)
        });
  
        // Extract latitude and longitude from the position object
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
  
        // Get weather data using latitude and longitude
        const weatherData = await weatherAPI.getWeatherDataWithLocation(latitude, longitude);
  
        // If weather data is available, return it
        if (weatherData) {
          return weatherData;
        }
      } else {
        console.log("Geolocation is not available.");
      }
    } catch (error) {
      console.log(error);
    }
  }
  getLocationSuccess()
async function weatherDataModel(city){
    
    const weatherData = await weatherAPI.getWeatherData(city, "en");
    if (weatherData) {
        // for run save to data Function to save it into localstorage > run after time to prevent add Missing words
        let weatherApp = new WeatherApp()
        setTimeout(() => {
            weatherApp.saveToDataList()
            
        }, 600);
        return weatherData

    } else {
        // getLocation()
        // console.log("Failed to fetch weather data.");
    }
}
  // Export the getLocation function

export {weatherDataModel,getLocationSuccess};
//  -------------------------------------------------------------------------
// Select Element
class WeatherApp {
    
    constructor() {
        // Cards for Now Card
        this.mainCardsContainer = document.getElementById("mainCardsContainer");
        this.mainCardShowNow = document.getElementById("mainCardShowNow"); // cardNow 
        this.mainCardShowDateNotiNow = document.getElementById("mainCardShowDateNotiNow"); // now or date
        this.mainCardCityNow = document.getElementById("mainCardCityNow");
        this.mainCardTempNow = document.getElementById("mainCardTempNow");
        this.mainCardShowStatuesNow = document.getElementById("mainCardShowStatuesNow");
        this.mainCardnowIconNow = document.getElementById("mainCardnowIconNow");
        this.mainCardShowNowLastUpdate = document.getElementById("mainCardShowNowLastUpdate");
        this.mainCardShowNowDate = document.getElementById("mainCardShowNowDate");
        // Cards for another cards
        this.mainCardShow = document.getElementById("mainCardShow"); // cardNow
        this.mainCardShowDateNoti = document.getElementById("mainCardShowDateNoti"); // now or date
        this.mainCardCity = document.getElementById("mainCardCity");
        this.mainCardTemp = document.getElementById("mainCardTemp");
        this.mainCardShowStatues = document.getElementById("mainCardShowStatues");
        this.mainCardnowIcon = document.getElementById("mainCardnowIcon");
        this.mainCardShowLastUpdate = document.getElementById("mainCardShowLastUpdate");
        this.mainCardShowDate = document.getElementById("mainCardShowDate");
        // for Details Card Hover
        this.detailsCard = document.getElementById("detailsCard");
        this.detailsMinTemp = document.getElementById("detailsMinTemp");
        this.detailsMaxTemp = document.getElementById("detailsMaxTemp");
        this.detailsmaxwind = document.getElementById("detailsmaxwind");
        this.detailsavghumidity = document.getElementById("detailsavghumidity");
        this.detailssunrise = document.getElementById("detailssunrise");
        this.detailssunset = document.getElementById("detailssunset");
        
        // Cards for Hours
        this.hoursContainer = document.getElementById("hoursContainer");
        this.hourCard = document.getElementById("hourCard");
        this.hourIcon = document.getElementById("hourIcon");
        this.hourTemp = document.getElementById("hourTemp");
        this.hourTime = document.getElementById("hourTime");
        this.hourStatus = document.getElementById("hourStatus");
        this.hourFeelsLike = document.getElementById("hourFeelsLike");
        this.hourHim = document.getElementById("hourHim");
        this.hourWind = document.getElementById("hourWind");
        
        // for change Background Video
        this.backGroundStatus = document.getElementById("backGroundStatus");
        //  To Save To DataList
        
    }
    // Add methods for handling functionality related to the elements
    backGroundVideos = {
        "Clean":"../Weather Status/Clean.webm",
        "Cloudy": "../Weather Status/Cloudy.webm",
        "Overcast":"../Weather Status/Overcast1.webm",
        "Partly cloudy":"../Weather Status/Partly Cloudy.webm",
        "Rainny":"../Weather Status/Rainny.webm"
    }

    // to select search input and button
    searchInput = document.getElementById("search") // G1
    searchIconBtn = document.getElementById("searchIconBtn")// G1
    listCities = document.getElementById('ListCities'); // for list of cities

    // DataList To Save Any Searched Word To Datalistand update to local storage
    
    saveToDataList() {
        setTimeout(() => {
          const dataListValues = localStorage.getItem("dataListValues") || "[]";
          const parsedValues = new Set(JSON.parse(dataListValues));
      
          const inputValue = this.searchInput.value.trim(); // Use the global searchInput variable
          if (inputValue && !parsedValues.has(inputValue)) { // Check for non-empty value and duplicates using Set
            parsedValues.add(inputValue);
          }
      
          localStorage.setItem("dataListValues", JSON.stringify(Array.from(parsedValues)));
      
          // Function to update the list of cities in the datalist
          function updateCityList() {
            let tempData = '';
            let valueCity = Array.from(parsedValues).filter(item => item !== "")
            valueCity.forEach((city) => {
              tempData += `<option value="${city}">`;
            });
            document.getElementById('ListCities').innerHTML = tempData;
          }
      
          updateCityList(); // Call the function to update the city list
      
        }, 600); // Run after 600ms
      }
     // to update Current Now Card with data
     updateNowCard(mainCardsContainer,mainCardShowNow, mainCardShowDateNotiNow, mainCardCityNow, mainCardTempNow,mainCardShowStatuesNow,mainCardnowIconNow,mainCardShowNowLastUpdate,mainCardShowNowDate) {
        this.mainCardsContainer = mainCardsContainer
        this.mainCardShowNow.textContent = mainCardShowNow
        this.mainCardShowDateNotiNow.textContent = mainCardShowDateNotiNow
        this.mainCardCityNow.textContent = mainCardCityNow
        this.mainCardTempNow.textContent = mainCardTempNow
        this.mainCardShowStatuesNow.textContent = mainCardShowStatuesNow
        this.mainCardnowIconNow.textContent = mainCardnowIconNow
        this.mainCardShowNowLastUpdate.textContent = mainCardShowNowLastUpdate
        this.mainCardShowNowDate.textContent = mainCardShowNowDate

        }

      // to update the another cards
      updateNowCard(mainCardShow,mainCardShowDateNoti,mainCardCity,mainCardTemp,mainCardShowStatues,mainCardnowIcon,mainCardShowLastUpdate,mainCardShowDate) {

        this.mainCardShow.textContent = mainCardShow
        this.mainCardShowDateNoti.textContent = mainCardShowDateNoti
        this.mainCardCity.textContent = mainCardCity
        this.mainCardTemp.textContent = mainCardTemp
        this.mainCardShowStatues.textContent = mainCardShowStatues
        this.mainCardnowIcon.textContent = mainCardnowIcon
        this.mainCardShowLastUpdate.textContent =mainCardShowLastUpdate
        this.mainCardShowDate.textContent = mainCardShowDate
        }
    // to update the Details Card Hover
    updateDetailsCard(detailsCard,detailsMinTemp,detailsMaxTem,detailsmaxwind,detailsavghumidity,detailssunrise,detailssunset){
        this.detailsCard.textContent = detailsCard
        this.detailsMinTemp.textContent = detailsMinTemp
        this.detailsMaxTemp.textContent = detailsMaxTem
        this.detailsmaxwind.textContent = detailsmaxwind
        this.detailsavghumidity.textContent = detailsavghumidity
        this.detailssunrise.textContent = detailssunrise
        this.detailssunset.textContent = detailssunset
    }

    // to update the hours card
    updateHours(hoursContainer,hourCard,hourIcon,hourTemp,hourTime,hourStatus,hourFeelsLike,hourHim,hourWind){
        this.hoursContainer = hoursContainer
        this.hourCard.textContent = hourCard
        this.hourIcon.textContent = hourIcon
        this.hourTemp.textContent = hourTemp
        this.hourTime.textContent = hourTime
        this.hourStatus.textContent = hourStatus
        this.hourFeelsLike.textContent = hourFeelsLike
        this.hourHim.textContent = hourHim
        this.hourWind.textContent = hourWind
    }



  }
  export { WeatherApp };

