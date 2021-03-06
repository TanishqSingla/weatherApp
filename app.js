//Express and http
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

//App
const app = express();

//Using body parser
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  console.log(req.body.cityName);
  //Weather app api url
  const query = req.body.cityName;
  const apiKey = "6b431d41b73d3494671a17eb0c89cab4";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`;

  //Making http request
  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      //weather data
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp - 273;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;

      //img url
      const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(`<h1>The temperature in ${query} is ${temp.toFixed(2)}</h1>`);
      res.write(`<p>It is ${description}</p>`);
      res.write(`<img src=${imgUrl} />`);
      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("Server live at port 3000");
});
