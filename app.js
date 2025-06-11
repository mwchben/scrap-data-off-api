const express = require('express')
const bodyParser = require('body-parser')
const app = express();

//route var
const PORT = process.env.PORT || 3001;
const indexRouter = require('./routes/index.js');

app.set('views','views')
app.set('view engine', 'ejs')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`GUI app is running on http://localhost:${PORT}`);
});
