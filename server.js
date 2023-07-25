const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/player", (req, res) => {
  res.sendFile(`${__dirname}/public/player.html`);
});

app.get("/score", (req, res) => {
  res.sendFile(`${__dirname}/public/score.html`);
});

app.get("/api/v1/players", (req, res) => {
  const players = JSON.parse(
    fs.readFileSync(`${__dirname}/data/players.json`, "utf-8")
  );
  res.json({ players });
});
app.post("/api/v1/players", (req, res) => {
  const { name } = req.body;

  try {
    const players = JSON.parse(
      fs.readFileSync(`${__dirname}/data/players.json`, "utf-8")
    );
    const newPlayer = {
      id: players[players.length - 1].id + 1,
      name,
    };
    players.push(newPlayer);
    fs.writeFileSync(`${__dirname}/data/players.json`, JSON.stringify(players));
    res.json({ player: newPlayer });
  } catch (error) {
    console.log(error);
  }
});

app.put("/api/v1/score", (req, res) => {
  const players = JSON.parse(
    fs.readFileSync(`${__dirname}/data/players.json`, "utf-8")
  );
  res.json({ players });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
