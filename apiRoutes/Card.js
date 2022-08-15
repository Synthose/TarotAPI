const Card = require('../model/card.js');
module.exports = async (req , res) => {
    var card = null;
    if (req.query.cardID)
    {
        card = await Card.findOne({_id: req.query.cardID});
    }
    else if(req.query.cardName)
    {
        card = await Card.findOne({cardName: req.query.cardName});
    }
    else
    {
        res.render('dashboard', {
            message: "No card found!"
        });
    }
    res.format({
        'text/plain': function(){
            res.send(card);
        },
        'application/json': function(){
            res.send(card);
        },
        'text/html': function(){
            res.render('card', { 
                name: card.cardName,
                quick: card.quickMeaning,
                upright: card.uprightMeaning,
                reversed: card.upsidedownMeaning,
                image: card.imageUrl 
            });
        }
    });
}