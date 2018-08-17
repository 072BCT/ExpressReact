let express = require('express');
const mysql = require('mysql');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const openurl = require("openurl")

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express world' });
});


app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
openurl.open("http://localhost:8080");
module.exports = app;
