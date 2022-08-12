const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let layoutSchema = new Schema({
	creationDate: 'Date',
	cards: {type: Array, default: []},
    versionKey: false,
}, {	
	collection: 'Layouts'
});

module.exports = mongoose.model('Layout', layoutSchema);