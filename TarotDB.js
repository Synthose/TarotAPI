const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const card = require('./model/card');
const credentials = require("./credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

let client = null;


let connection = null;
let model = null;
let Schema = mongoose.Schema;


module.exports = {	
	getCardModel: () => {
		if (connection == null) {
			console.log("Creating connection and model...");
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
			model = card;
		};
		return model;
	},
	getLayoutModel: () => {
		if (connection == null) {
			console.log("Creating connection and model...");
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
			model = connection.model("LayoutModel", 
							layoutSchema);
		};
		return model;
	},
	getUserModel: () => {
		if (connection == null) {
			console.log("Creating connection and model...");
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
			model = connection.model("UserModel", 
							userSchema);
		};
		return model;
	}
};