const Card = require('../model/card.js');
const User = require('../model/user.js');
const Layout = require('../model/layout.js');
module.exports = async (req , res) => {
    let cards = await Card.find({});
    let cardcount = cards.length;
    let cardsToDraw;
    if(req.query.draw){
        cardsToDraw = req.query.draw;
    }else{
        cardsToDraw = 3;
    }
    let cardindexs = new Array(cardsToDraw);
    let i = 0;
    while(i < cardsToDraw){
        let selectedCard = Math.floor(Math.random() * cardcount);
        if(!cardindexs.includes(selectedCard)){
            cardindexs[i] = selectedCard;
            i++;
        }
    }
    
    let cardIDs = new Array(cardsToDraw);
    for(let i = 0; i < cardsToDraw; i++){
        cardIDs[i] = cards[cardindexs[i]]._id;
    }
    
    let drawnCards = new Array(cardsToDraw);
    for(let i = 0; i < cardsToDraw; i++){
        drawnCards[i] = cards[cardindexs[i]];
    }

    let layout = new Layout({
        creationDate: new Date(),
        cards: cardIDs
    });
    var user = null;
    if(req.params.p || req.session.user){
        user = await User.findOne({username: req.params.p?req.params.p:req.session.user});
        if(!user){
            let newUser = new User({
                username: req.params.p,
                password: 'password',
                email: 'email',
                creationDate: new Date(),
                layouts: [],
            });
            newUser.layouts.push(layout);
            await newUser.save();
            user = newUser;
        }
        layout = await layout.save();
        await User.findOneAndUpdate(
            {username: user.username},
            {$push: {layouts: layout}}
        ).exec();
    }
    res.format({
        'text/plain': function(){
            let response = "";
            for(let i = 0; i < cardsToDraw; i++){
                response += "You drew the " + drawnCards[i].cardName + (drawnCards[i].uprightMeaning ? " upright: \n" + drawnCards[i].uprightMeaning : " inverted: \n" + drawnCards[i].upsidedownMeaning );
            }
            res.send(response);
        },
        'application/json': function(){
            res.send(drawnCards);
        },
        'text/html': function(){
            let formatedCards = new Object();
            formatedCards.data = drawnCards.map(function(card){
                let smallcard = new Object();
                smallcard.cardName = card.cardName;
                smallcard.imageurl = card.imageUrl;
                smallcard.orientation = Math.floor(Math.random() * 2)<1 ? 'upright' : 'inverted';
                smallcard.rotation = smallcard.orientation == 'upright' ? '0' : '180';
                smallcard.meaning = smallcard.orientation == 'upright' ? card.uprightMeaning : card.upsidedownMeaning;
                return smallcard;
            });
            console.log(formatedCards);
            res.render('DrawCards', {
                c: formatedCards.data,
                user: (user!=null ? user.username : 'Your')
            });
        },
        'default': function() {
            // log the request and respond with 406
            res.status(406).send('Not Acceptable');
        }
    });
}