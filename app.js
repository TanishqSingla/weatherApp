const express = require("express");
const https = require("https");

const app = express();

app.get("/", (req, res) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=London&appid=6b431d41b73d3494671a17eb0c89cab4";

  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
    });
  });

  res.send("Server up and running");
});

app.listen(3000, () => {
  console.log("Server live at port 3000");
});
