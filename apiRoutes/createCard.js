const Card = require('../model/card.js');
module.exports = async (req , res) => {
   const card = new Card({
        cardNumber: req.body.rank,
        cardName: req.body.name,
        cardSuit: req.body.suit,
        quickMeaning: req.body.fortune_telling.join(". "),
        keywords: req.body.keywords,
        uprightMeaning: req.body.meanings.light.join(". "),
        upsidedownMeaning: req.body.meanings.shadow.join(". "),
        imageUrl: req.body.url
    });
    try{
        if(Card.findOne({cardNumber: req.body.cardNumber})){
            res.status(201).send("Card already exists");
        }else{
            const newCard = await card.save();
            res.status(201).json(newCard);
        }
    }catch(err){
        res.send('Error ' + err);
    }
};