const express = require("express");
const axios = require("axios");

const app = express();
const port = 5001;

app.use((req, res, next) => {
  console.log(
    "incoming request to gameinfo service: " + req.method + " " + req.url,
  );
  next();
});

app.get("/getGameInfo/:id", async (req, res) => {
  console.log("hello: ");
  try {
    const response = await axios.get(
      `http://store.steampowered.com/api/appdetails?appids=${req.params.id}`,
    );

    const data = response.data[req.params.id];

    res.json(data);
  } catch (err) {
    console.log("errororr: ", err);
    res.status(500).send(err.message);
  }
});

app.get("/getGameInfo/:id/players", async (req, res) => {
  try {
    const response = await axios.get(
      `http://api.steampowered.com//ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${req.params.id}`,
    );

    const data = response.data.response;

    res.send(data);
  } catch (err) {
    console.log("errororr: ", err);
    res.status(500).send({ err: err.message, params: req.params });
  }
});

app.listen(port, () => {
  console.log(`User service running on http://localhost:${port}`);
});
