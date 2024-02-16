const express = require("express");
const { STATUS_CODES } = require("http");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile("build/index.html", { root: __dirname });
});

app.use(express.static(__dirname + "/build"));

app.use((req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
