const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const express = require("express");

const app = express();

app.get("/", function (req, res) {
    res.send("You have hit the homepage for the to come GUI")
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

app.listen(PORT, () =>
  console.log(
    `Server running on port ${PORT}, access with http://localhost:${PORT}`
  )
);
