async function getOutfit() {
  var city = document.getElementById("city").value;
  var result = document.getElementById("result");
  result.innerHTML = "Loading...";

  try {
    // Step A: city name -> location (like asking a map for the address)
    var geo = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + city + "&count=1");
    var geoData = await geo.json();
    if (!geoData.results) {
      result.innerHTML = "City not found";
      return;
    }
    var lat = geoData.results[0].latitude;
    var lon = geoData.results[0].longitude;

    // Step B: location -> current weather
    var w = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&current_weather=true");
    var wData = await w.json();
    var temp = wData.current_weather.temperature;

    // Step C: temperature -> outfit
    var outfit;
    if (temp >= 32) outfit = "Light cotton clothes, sunglasses and a cap";
    else if (temp >= 25) outfit = "T-shirt and jeans or a light kurti";
    else if (temp >= 18) outfit = "Full sleeves with a light jacket";
    else outfit = "Sweater or hoodie, warm clothes";

    result.innerHTML = city + ": " + temp + "°C <br>" + outfit;
  } catch (e) {
    result.innerHTML = "Something went wrong. Try again.";
  }
}
