const asyncRequest = require("async-request");
const API_KEY = "86eb6176a7bb4e116165adc5e31721b1";
const getWeather = async (address) => {
  const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${address}`;
  try {
    const req = await asyncRequest(url);
    const data = JSON.parse(req.body);
    const findWeather = {
      isSuccess: true,
      region: data.location.region,
      country: data.location.country,
      temperature: data.current.temperature,
      wind_speed: data.current.wind_speed,
      precip: data.current.precip,
      cloudcover: data.current.cloudcover,
    };
    return findWeather;
  } catch (err) {
    return {
      isSucess: false,
      err,
    };
  }
};

const express = require("express");
const app = express();
const port = 7000;
const path = require("path");
const publicPath = path.join(__dirname, "./public");
app.use(express.static(publicPath));

app.get("/", async (req, res) => {
  const address = req.query.address;
  const weather = await getWeather(address);
  console.log(weather);
  res.render("weather", {
    isSearch: true,
    region: weather.region,
    country: weather.country,
    temperature: weather.temperature,
    wind_speed: weather.wind_speed,
    precip: weather.precip,
    cloudcover: weather.cloudcover,
  });
});

app.set("view engine", "hbs");

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});
