//practice add
const TarotDB = require('./TarotDB.js');

const Card = TarotDB.getCardModel();

(async () => {
    await Card.deleteMany({});

    let card1 = new Card({
        cardNumber : 1,
        cardName : 'The Fool',
        uprightMeaning : 'Lorem',
        upsidedownMeaning: 'Ipsum'
    });

    let card2 = new Card({
        cardNumber : 2,
        cardName : 'The Magician',
        uprightMeaning : 'Lorem2',
        upsidedownMeaning: 'Ipsum2'

    })

    await Promise.all([
        card1.save(),
        card2.save()
    ]);

    let Deck = await Card.find({});

	console.log(Deck);
	process.exit();
})();