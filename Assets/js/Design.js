import { weatherDataModel , WeatherApp  } from './logic.js';
let selectElements = new WeatherApp();
let hoursDataTemp = {}
// Appication Design
class AppDesign{
    constructor(){
    }
    // clear data after get the data
    //G3 Event After press Search Button > app js
    clear(input){
        return input.value = ""
    }
    // add Weather Cards and set information from Data Object to card values
    addWeatherCards(dataObject) {
        // console.log(typeof(dataObject)) // returned object
        // Iterate over the dataObject and create weather cards
        // define empty string for using it
        let cardTempCurrent = ``
        let cardDayTemp = ``

        cardTempCurrent += `<div id="mainCardShowNow" class="layer">
        <div  class="weatherCard nowCard">
            <div class="layerContent CurrentLayer">
                <p>Now</p>
            </div>
            <div class="col-6">
                <div class="row">
                    <h2 id="mainCardCityNow">${dataObject.city}</h2>
                    <h5 id="mainCardShowStatuesNow">${dataObject.tempStatus}</h5>
                </div>
                <div class="row">
                    <p class="currentTemp"><span id="mainCardTempNow">${dataObject.tempNow}</span> °</p>
                </div>
            </div>
            <div class="col-8">
                <picture> 
                    <img id="mainCardnowIconNow"  src="${dataObject.tempIcon}" alt="">
                </picture>
            </div>
            <div class="weatherCardFooter">
                <p>Date: <span id="mainCardShowNowDate">${dataObject.date}</span></p>
                <p>updated: <span id="mainCardShowNowLastUpdate">${dataObject.lastUpdated}</span></p>
            </div>
            
            
        </div>
        <div class="weatherDetails">
        
            <div id="detailsCard" class="data ul_li_data">
    
                <div><i class="fa-solid fa-temperature-arrow-up"></i>feelsLike</div>
                <p> <span id="detailsMaxTemp">${dataObject.feelsLike}</span>°</p>
            </div>
            <div class="data ul_li_data">
                <div><i class="fa-solid fa-wind"></i>Wind</div>
                <p> <span id="detailsmaxwind">${dataObject.wind}</span>Km</p>
            </div>
            <div class="data ul_li_data">
                <div><i class="fa-solid fa-droplet"></i>Humidity</div>
                <p> <span id="detailsavghumidity">${dataObject.humidity}</span>%</p>
            </div>
        </div>
    </div>`

    // change BackGround Based Weather Status
    


        try{
            dataObject.forcast.forEach((day)=>{
                console.log(day)
                hoursDataTemp = day
                
                cardDayTemp += `<div id="mainCardShow" class="layer">
                <div  class="weatherCard day1Card">
                    <div class="layerContent">
                        <p>${day.dayName}</p>
                    </div>
                    <div class="col-6">
                        <div class="row">
                            <h2 id="mainCardCity">${dataObject.city}</h2>
                            <h5 id="mainCardShowStatues">${day.tempStatus}</h5>
                        </div>
                        <div class="row">
                            <p class="currentTemp"><span id="mainCardTemp">${day.maxtemp_c}</span> °</p>
        
                        </div>
                    </div>
                    <div class="col-8">
                        <picture>
                            <img id="mainCardnowIcon" src="${day.tempIcon}" alt="">
                        </picture>
                    </div>
                    <div class="weatherCardFooter">
                        <p>Date: <span id="mainCardShowDate">${day.date}</span></p>
                        <p>updated: <span id="mainCardShowLastUpdate">${dataObject.lastUpdated}</span></p>
                    </div>
                    
                    
                </div>
                <div class="weatherDetails">
                
                    <div id="detailsCard" class="data ul_li_data">
        
                        <div><i class="fa-solid fa-temperature-arrow-up"></i>Max</div>
                        <p> <span id="detailsMaxTemp">${day.maxtemp_c}</span>°</p>
                    </div>
                    <div class="data ul_li_data">
                        <div><i class="fa-solid fa-temperature-arrow-down"></i>Min</div>
                        <p> <span id="detailsMinTemp">${day.mintemp_c}</span>°</p>
                    </div>
                    <div class="data ul_li_data">
                        <div><i class="fa-solid fa-wind"></i>Wind</div>
                        <p class="destance"> <span id="detailsmaxwind">${day.maxwind_kph}</span>km</p>
                    </div>
                    <div class="data ul_li_data">
                        <div><i class="fa-solid fa-droplet"></i>Humidity</div>
                        <p> <span id="detailsavghumidity">${day.avghumidity}</span>%</p>
                    </div>
                    <div class="data ul_li_data">
                        <div><i class="fa-solid fa-cloud-sun"></i>Sunrise</div>
                        <p> <span id="detailssunrise" >${day.sunrise}</span></p>
                    </div>
                    <div class="data ul_li_data">
                        <div><i class="fa-solid fa-sun-plant-wilt"></i>Sunset</div>
                        <p> <span id="detailssunset">${day.sunset}</span></p>
                    </div>
        
                </div>
            </div>`
            // handlingHours(day)
            // this.handlingHours(dataObject)
        
            })
        }catch(error){
            document.getElementById("mainCardsContainer").classList.toggle = "none"
        }
 

    document.getElementById("mainCardsContainer").innerHTML = cardTempCurrent + cardDayTemp;
    console.log(document.getElementById("mainCardsContainer"))
    this.showHours()

      }
      
      changeBackgound(dataObject) {
        let getVideo = document.getElementsByTagName("video")[0];
        function background(status) {
            getVideo.innerHTML = `<source id="backGroundStatus" src="./Assets/Weather Status/${status}" type="video/mp4"></source>`;
            getVideo.load()
        }
      
        console.log(dataObject.tempStatus);
        if (dataObject.tempStatus.includes("cloud")) {
            console.log(dataObject.tempStatus)
            background("Partly Cloudy.webm");
            
          } else if (dataObject.tempStatus.includes("Sunny")) {
            background("Clean.webm");
            console.log(dataObject.tempStatus)
            
          } else if (dataObject.tempStatus.split(" ").includes("rain") || dataObject.tempStatus.split(" ").includes("Thundery")) {
              background("Rainny.webm");
              console.log(dataObject.tempStatus)
              
            }else if (dataObject.tempStatus.split(" ").includes("Overcast")) {
                background("Overcast1.webm");
                console.log(dataObject.tempStatus)
                
              }else{
                background("Clean.webm");
              }



        
    
    
    
    
    }
    handlingHours(){
        
        let hoursCurrent=``
        try{
            let current = hoursDataTemp.hours
            current.forEach((hour)=>{
                hoursCurrent += `<div id="hourCard" class="ul_li_data hourly ">
                <div class="pi d-flex justify-content-center align-items-center">
                    <picture><img id="hourIcon" src="${hour.icon}" alt=""></picture>
                    <h2><span id="hourTemp">${hour.temp_c}</span>°</h2>
                </div>
                <p><i class="fa-solid fa-clock"></i><span id="hourTime">${hour.time}</span></p>
                <p class="wStatuesP" id="hourStatus">${hour.status}</p>
                <p><i class="fa-solid fa-droplet"></i> <span id="hourHim">${hour.humidity}%</span></p>
                <p><i class="fa-solid fa-wind"></i> <span id="hourWind">${hour.wind_kph}km</span></p>
            </div>`
            })
        }catch(error){

        }

        document.getElementById("hoursContainer").innerHTML = hoursCurrent;
    }
    showHours(){
        let weatherDetails = document.querySelectorAll(".weatherDetails");
        let hoursContainer = document.getElementById("hoursContainer")
        let hourlyItems = document.querySelectorAll('.hourly');
        weatherDetails.forEach((elem)=>{
            elem.addEventListener("click",()=>{
                console.log("waleed")
                // 
                
                this.handlingHours()
                selectElements.hoursContainer.classList.toggle("show")                
                
                hourlyItems.forEach((item,index) =>{
                    setTimeout(()=>{
                        item.classList.toggle("show")
                    }, index * 100)
                })
            })

        })
        hoursContainer.addEventListener("click",function(){
            selectElements.hoursContainer.classList.remove("show")
           

        })
        
    }
}
// Show Hourly Data Via floating button

export { AppDesign };



