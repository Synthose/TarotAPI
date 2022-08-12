const Card = require('../model/card.js');
const User = require('../model/user.js');
const layout = require('../model/layout.js');
module.exports = async (req , res) => {
    let user = await User.findOne({username: req.params.p});
    let response = new Object();
    let historyCount = 0;
    if(!user){
        res.send("User not found");
    }else{
        if(!req.query.count){
            historyCount = 1;
        }else{
            historyCount = req.query.count;
        }
        let layouts = user.layouts;
        let history = [];
        console.log(layouts.length);
        for(let i = layouts.length-1, j=0 ; i >= 0 && j<historyCount ; i--, j++){
            let recentLayout = layouts[i][0];
            console.log(i+" "+j);
            console.log((recentLayout)._id);
            var cards = []
            for(let i = 0; i < recentLayout.cards.length; i++){
                let card = await Card.findOne({_id: recentLayout.cards[i]});
                cards.push(card.cardName);
            }
            cards.push(recentLayout.creationDate);
            history.push(cards);
        }
        response.lastReading = history;
        

        console.log(response);
        res.json(response);
    }
};
