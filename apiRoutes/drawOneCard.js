const Card = require('../model/card.js');
const User = require('../model/user.js');
const layout = require('../model/layout.js');
module.exports = async (req , res) => {
    let cards = await Card.find({});
    let selectedCard = Math.floor(Math.random() * cards.length);
    let cointoss = Math.floor(Math.random() * 2);
    var response = "";    
    var user = null;
   
    let newLayout = new layout({ 
        creationDate: new Date(),
        cards: [cards[selectedCard]._id]
    });
    if(req.params.p || req.session.user){
        console.log(req.session);
        let p = req.params.p ? req.params.p : req.session.user;
        user = await User.findOne({username: p});
        newlayout = await newLayout.save();
        if(!user || user.length == 0){
            let newUser = new User({
                username: p,
                password: 'password',
                email: 'email',
                creationDate: new Date(),
                layouts: [],
            });
            newUser.layouts.push(newlayout);
            await newUser.save();
            console.log('New user created '+ newUser);
            response += "New user detected. Creating account...\n";
        }
        else{
            console.log('User found '+ user.username);
            await User.findOneAndUpdate(
            {username: user.username},
            {$push: {layouts: newLayout}}
            ).exec();
        }
    }
    
    response += "You drew the " + cards[selectedCard].cardName + (cointoss<1 ? " upright: \n" + cards[selectedCard].uprightMeaning : " inverted: \n" + cards[selectedCard].upsidedownMeaning );
    res.format({
        'text/plain': function(){
            res.send(response);
        },
        'application/json': function(){
            res.send(cards[selectedCard]);
        },
        'text/html': function(){
            res.render('DrawCard', {
                cardname: cards[selectedCard].cardName, 
                user: (user!=null ? user.username : 'Your'),
                orientation: (cointoss<1 ? 'upright' : 'inverted'),
                rotation: (cointoss<1 ? '0' : '180'),
                meaning: (cointoss<1 ? cards[selectedCard].uprightMeaning : cards[selectedCard].upsidedownMeaning),
                imageurl: cards[selectedCard].imageUrl
            });
        },
        'default': function() {
            // log the request and respond with 406
            res.status(406).send('Not Acceptable');
        }
    });

    
};