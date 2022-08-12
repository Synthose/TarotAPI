const Card = require('../model/card.js');
const https = require('https');
const { connection } = require('mongoose');
module.exports = async (req , res) => {
    var tarotJSON = "https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json";
    var json = null;
    let tarotcards = [];
    https.get(tarotJSON,(res) => {
        let body = "";
        
        res.on("data", (chunk) => {
            body += chunk;
        });
    
        res.on("end", () => {
            try {
                connection.collection('Deck').drop();
                json = JSON.parse(body);
                var cards = json.tarot_interpretations;
                cards.forEach (card=> {
                    let i = 0;
                    let newCard = new Card({
                        cardNumber: card.rank.toString().replace("page",11).replace("knight",12).replace("queen",13).replace("king",14),
                        cardName: card.name,
                        cardSuit: card.suit,
                        quickMeaning: card.fortune_telling.join(". "),
                        keywords: card.keywords,
                        uprightMeaning: card.meanings.light.join(". "),
                        upsidedownMeaning: card.meanings.shadow.join(". "),
                        imageUrl: "https://gfx.tarot.com/images/site/decks/rider/full_size/"+i+".jpg"
                    });
                    i++;
                    newCard.save();
                    console.log(newCard);
                });
                return tarotcards;
            } catch (error) {
                console.error(error.message);
            };
        });
    
    }).on("error", (error) => {
        console.error(error.message);
    });
    try{
        res.status(201).send("Deck instatiated");  
    }catch(err){
        res.send('Error ' + err);
    }
};