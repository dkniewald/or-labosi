const express = require('express');
const app = express();
const path = require('path');

app.set("views", path.join(__dirname, "pages"));
app.engine("html", require("ejs").renderFile);

app.use(express.urlencoded({
  extended: true
}));

app.use(express.static('pages'));

app.get("/datatable", function (req, res) {

  res.render("datatable.html");
});

app.listen(80);