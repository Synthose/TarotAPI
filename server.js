const express = require('express');
const mongoose = require('mongoose');

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const handlebars = require('express-handlebars');
app.set('view engine', 'handlebars');

const credentials = require("./credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

mongoose.connect(dbUrl);
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('connected', function() {
	console.log("Connected to database");
});


const routes = require('./apiRoutes/index');

app.use('/', routes);



app.listen(3000, function(){
    console.log('http://localhost:3000');
  });
  
  