const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const cardSchema = new Schema({
	cardNumber: 'Number',
	cardName: 'String',
    cardSuit: 'String',
    quickMeaning: 'String',
    keywords: 'Array',
    uprightMeaning: 'String',
    upsidedownMeaning: 'String',
    imageUrl: 'String',
    versionKey: false,
}, {
	collection: 'Deck'
});

module.exports = mongoose.model('Card', cardSchema);