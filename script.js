//select elements
const descElememnt = document.querySelector(".min");
const iconElememnt = document.querySelector(".weather_data_image");
const tempElememnt = document.querySelector(".max");
const disPlace = document.querySelector(".text_overlay_place");

const weather = {};

weather.temperature = {
  unit: "celsius"
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
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.temperature.value = Math.floor(data.main.temp);
      weather.temperature.min = Math.floor(data.main.temp_min);

      var hours=new Date((weather.hour)*1000);
      var hour = hours.getHours();
      var greetingText = document.getElementById('greeting_text');
      if (hour > 0 && hour < 12) {
        greetingText.innerHTML = "GOOD MORNING";
      } else if (hour >= 12 && hour < 16) {
        greetingText.innerHTML = "GOOD AFTERNOON";
      } else {
        greetingText.innerHTML = "GOOD EVENING";
      } 
    })
    .then(function () {
      displayWeather();
    });
}

function displayWeather() {
  var logo = document.getElementById('weather_image');
  logo.src = "http://openweathermap.org/img/wn/" + weather.iconId + ".png";
  logo.setAttribute('src', logo.src);
  iconElememnt.setAttribute = `<img src="${weather.iconId}.png"/>`;
  document.getElementById('max').innerHTML = weather.temperature.value + "&deg C";
  document.getElementById('weather_description').innerHTML = weather.description;
  document.getElementById('place').innerHTML = weather.name;
  document.getElementById('min').innerHTML = weather.temperature.min + "&deg C";
}

function dayName() {
  var date_n = new Date();
  var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "thursday", "Friday", "saturday"];
  var count_day = weekday[date_n.getDay()];
  document.getElementById("current_day").innerHTML = count_day;
}
//     $.getJSON("http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+longi+"&APPID=3925448c90c02ec2a83ed41c1a713a1d",function(json){

// dropdown