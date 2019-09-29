//select elements
// const descElememnt = document.querySelector(".min");
const iconElememnt = document.querySelector(".weather_data_image");
const tempElememnt = document.querySelector(".max");
const disPlace = document.querySelector(".text_overlay_place");
const weather_image = document.querySelector(".image_main");
const descrEle=document.querySelector(".wea_des");
// const rightElement=document.querySelector(".right p");
const cityElement=document.querySelector(".text_overlay_place");
const tempminElement=document.querySelector(".min");

const weather = {};

const forecast = {};

// const by_city = {};

weather.temperature = {
  unit: "celsius"
}

forecast.temp = {
  unit: "celsius"
}

weather.temperature1={
  unit:"celsius"
}


if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  descElememnt.style.display = "block";
  descElememnt.innerHTML = "<p>browser doesnt support geolocation</p>";
}
//set users position
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

function showError(error) {
  descElememnt.style.display = "block";
  descElememnt.innerHTML = `<p>${error.message}</p>`;
}

//get weather from api
function getWeather(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=3925448c90c02ec2a83ed41c1a713a1d`;

  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      weather.temperature.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.temperature.value = Math.floor(data.main.temp_max);
      weather.temperature.min = Math.floor(data.main.temp_min);
      weather.city = data.name;

      var hours = new Date((weather.hour) * 1000);
      var hour = hours.getHours();
      var greetingText = document.getElementById('greeting_text');
      if (hour > 0 && hour < 12) {
        greetingText.innerHTML = "GOOD MORNING";
        var morn = document.getElementById('weather_image_full');
        morn.src = "imgs/morning.jpg";
        morn.setAttribute('src', morn.src);
        weather_image.setAttribute = "<img src='imgs/morning.jpg'>";
      } else if (hour >= 12 && hour < 16) {
        greetingText.innerHTML = "GOOD AFTERNOON";
        var aft = document.getElementById('weather_image_full');
        aft.src = "imgs/afnoon.jpg";
        aft.setAttribute('src', aft.src);
        weather_image.setAttribute = "<img src='imgs/afnoon.jpg'>";

      } else {
        greetingText.innerHTML = "GOOD EVENING";
        var night = document.getElementById('weather_image_full');
        night.src = "imgs/night.jpg";
        night.setAttribute('src', night.src);
        weather_image.setAttribute = "<img src='imgs/night.jpg'>";
      }
    })
    .then(function () {
      displayWeather();
    });
}
function cityClick(latitude,longitude,time){
  let api1=`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=3925448c90c02ec2a83ed41c1a713a1d`;
  
  fetch(api1)
      .then(function(response){
          let data1=response.json();
          return data1;
      
  })
  .then(function(data1){
      weather.temperature.description=data1.weather[0].description;
      weather.hour=data1.dt;
      weather.iconId=data1.weather[0].icon;//
      weather.temperature.value=Math.floor(data1.main.temp_max);//
      weather.city=data1.name;//
      weather.temperature.min=Math.floor(data1.main.temp_min);//
      // var d=new Date((weather.description)*1000);
      var hours1=new Date((weather.hour)*1000);
      var hour0=hours1.getHours();
      hour1=hour0-time;
      if(hour1>0 && hour1<12){
          weather_image.innerHTML="GOOD MORNING";
        //   var morn = document.getElementById('weather_image_full');
        // morn.src = "imgs/morning.jpg";
        // morn.setAttribute('src', morn.src);
        // weather_image.setAttribute = "<img src='imgs/morning.jpg'>";
      }
      else if(hour1>=12 && hour1<16){
          weather_image.innerHTML="GOOD AFTERNOON";
        //   var aft = document.getElementById('weather_image_full');
        // aft.src = "imgs/afnoon.jpg";
        // aft.setAttribute('src', aft.src);
        // weather_image.setAttribute = "<img src='imgs/afnoon.jpg'>";
      }
      else{
          weather_image.innerHTML="GOOD EVENING";
        //   var night = document.getElementById('weather_image_full');
        // night.src = "imgs/night.jpg";
        // night.setAttribute('src', night.src);
        // weather_image.setAttribute = "<img src='imgs/night.jpg'>";
      }

  })
  .then(function(){
      displayWeather();
  });
}

function getForecast(latitude, longitude) {
  let api_fore = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&APPID=3925448c90c02ec2a83ed41c1a713a1d`;

  fetch(api_fore).
  then(function (response_fore) {
      let data_fore = response_fore.json();
      return data_fore;
    })
    .then(function (data_fore) {
      forecast.icon = data_fore.forecast[0].icon;
      forecast.temp.maxi = Math.floor(data_fore.main.temp_max);
      forecast.temp.mini = Math.floor(data_fore.main.temp_min);
    })
    .then(function () {
      displayForecast();
    });
}

function displayWeather() {
  var logo = document.getElementById('weather_image');
  logo.src = "http://openweathermap.org/img/wn/" + weather.iconId + ".png";
  logo.setAttribute('src', logo.src);
  iconElememnt.innerHTML = `<img src="${weather.iconId}.png"/>`;
  document.getElementById('max').innerHTML = weather.temperature.value + "&deg C";
  document.getElementById('weather_description').innerHTML = weather.temperature.description;
  document.getElementById('place').innerHTML = weather.city;
  document.getElementById('min').innerHTML = weather.temperature.min + "&deg C";

  // descrEle.innerHTML=`${weather.description}`;

  // document.getElementById('min').innerHTML = weather.temperature.min + "&deg C";
  // tempElememnt.innerHTML=`${weather.temperature.value}&deg C`;
  // tempminElement.innerHTML=`${weather.temperature.min}&deg C`;
  // tempminElement.innerHTML=`${weather.temperature1.value}&deg C`;
  // cityElement.innerHTML=weather.city;


}

function displaForecast() {
  // var logo = document.getElementById('weather_image');
  // logo.src = "http://openweathermap.org/img/wn/" + forecast.iconId + ".png";
  // logo.setAttribute('src', logo.src);
  // iconElememnt.setAttribute = `<img src="${forecast.iconId}.png"/>`;
  document.getElementById('forecast').innerHTML = forecast.temperature.value + "&deg C";
  document.getElementById('fore_min').innerHTML = forecast.temperature.min + "&deg C";
}

function dayName() {
  var date_n = new Date();
  var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "thursday", "Friday", "saturday"];
  var count_day = weekday[date_n.getDay()];
  document.getElementById("current_day").innerHTML = count_day;
}

// dropdown

function dropDown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}