const express = require('express');
const mongoose = require('mongoose');
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
const app = express();

const oneDay = 86400000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(cookieParser());
app.use(sessions({
  secret: "thisisasecretcodeshhdonttellanyone",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: oneDay }
}));


const { engine } = require ('express-handlebars');
app.engine('handlebars', engine({ extname: "handlebars", defaultLayout: 'main',
  layoutsDir: "views/pagelayouts/"
}));
app.set('view engine', 'handlebars');
app.set("views", "./views");

const credentials = require("../credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

mongoose.connect(dbUrl);
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('connected', function() {
	console.log("Connected to database");
});

var session;
if(session!=null){
  console.log("Session is not null");
}
const routes = require('../apiRoutes/index');

app.use(`/.netlify/functions/server`, routes);


  module.exports = app;
  module.exports.handler = serverless(app);