const express = require("express");
const axios = require("axios");
let dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 5002;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

app.use((req, res, next) => {
  console.log("incoming PLAYER request: " + req.method + " " + req.url);
  next();
});

app.get("/getPlayerInfo/:id", async (req, res) => {
  try {
    const getPlayer = await axios.get(
      `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.API_KEY}&steamids=${req.params.id}`,
    );
    const data = getPlayer.data;
    res.send(data.response);
  } catch (err) {
    console.log("errororr: ", err);
    res
      .status(500)
      .send("Error fetching playersss details. Please try again later.");
  }
});

app.get("/getPlayerInfo/:id/friends", async (req, res) => {
  try {
    const response = await axios.get(
      `http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${process.env.API_KEY}&steamid=${req.params.id}`,
    );

    const data = response.data;

    console.log("hi: ", data);
    res.send(data.friendslist);
  } catch (err) {
    console.log("errororr: ", err);
    res.status(500).send({ err: err.message, params: req.params });
  }
});

app.get("/getPlayerInfo/:id/ownedGames", async (req, res) => {
  try {
    const response = await axios.get(
      `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.API_KEY}&steamid=${req.params.id}`,
    );

    const data = response.data;

    console.log("OWNED GAMES: ", data);
    res.send(data.response);
  } catch (err) {
    console.log("errororr: ", err);
    res.status(500).send({ err: err.message, params: req.params });
  }
});

app.get("/getPlayerInfo/:id/recentlyPlayed", async (req, res) => {
  try {
    const response = await axios.get(
      `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${process.env.API_KEY}&steamid=${req.params.id}`,
    );

    const data = response.data;

    //Success res =
    //     {
    //     "total_count": 1,
    //     "games": [
    //         {
    //             "appid": 1659040,
    //             "name": "HITMAN World of Assassination",
    //             "playtime_2weeks": 668,
    //             "playtime_forever": 2518,
    //             "img_icon_url": "552be1d38866afd1c33f682323d325130e7d0ce6",
    //             "playtime_windows_forever": 2518,
    //             "playtime_mac_forever": 0,
    //             "playtime_linux_forever": 0,
    //             "playtime_deck_forever": 0
    //         }
    //     ]
    // }

    //route for img_icon_url:  http://media.steampowered.com/steamcommunity/public/images/apps/{appid}/{hash}.jpg

    console.log("RECENTLY PLAYED: ", data);
    res.send(data.response);
  } catch (err) {
    console.log("errororr: ", err);
    res.status(500).send({ err: err.message, params: req.params });
  }
});

app.get("/getPlayerInfo/:id/gameStats/:appid", async (req, res) => {
  try {
    const response = await axios.get(
      `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${req.params.appid}&key=${process.env.API_KEY}&steamid=${req.params.id}`,
    );

    const data = response.data;

    // success res = { playerstats: steamID: '', gameName: '', stats: {name: '', value: num }[] achievements: {name: '', achieved: num }[]}

    console.log("GAME STATS FOR USER: ", data);
    res.send(data);
  } catch (err) {
    console.log("errororr: ", err);
    res.status(500).send({ err: err.message, params: req.params });
  }
});

app.get("/getPlayerInfo/:id/gameAchievements/:appid", async (req, res) => {
  try {
    const response = await axios.get(
      `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${req.params.appid}&&key=${process.env.API_KEY}&steamid=${req.params.id}`,
    );

    // error res = { playerstats: error: '', success: false}
    // success res = { playerstats: steamID: '', gameName: '', achievements: {apiname: '', achieved: num, unlocktime: num/date?}[], success: boolean}

    const data = response.data;

    console.log("ACHIEVEMENTS FOR GAME: ", data);
    // res.send(data.friendslist);
  } catch (err) {
    console.log("errororr: ", err);
    res.status(500).send({ err: err.message, params: req.params });
  }
});

app.listen(port, () => {
  console.log(`User service running on ${process.env.PLAYERS_API_BASE_DOMAIN}`);
});
