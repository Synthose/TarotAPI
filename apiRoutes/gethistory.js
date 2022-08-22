const Card = require('../model/card.js');
const User = require('../model/user.js');
const layout = require('../model/layout.js');
module.exports = async (req , res) => {
    var user = req.session.user?req.session.user:req.params.p;
    console.log(user);
    var user = await User.findOne({username: user});
    let response = new Object();
    let historyCount = 0;
    if(!user){
        res.format({
            'application/json': function(){
                response.status = "error";
                response.message = "User not found";
                res.json(response);
            },
            'text/html': function(){
                res.render('dashboard', {
                    message: "Not Logged in, or user not found!"
                });
            }
        });
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
            let event = new Object();
            event.cards = [];
            event.creationDate=null;
            let recentLayout = layouts[i][0];
            console.log((recentLayout)._id);
            for(let i = 0; i < recentLayout.cards.length; i++){
                let card = await Card.findOne({_id: recentLayout.cards[i]});
                event.cards.push([card.cardName,card._id]);
            }
            event.creationDate = recentLayout.creationDate;
            history.push(event);
        }
        response.lastReading = history;
        res.format({
            'text/plain': function(){
                res.json(response);
            },
            'application/json': function(){
                res.json(response);
            },
            'text/html': function(){
                console.log(history)
                var data = user;
                res.render('history', {
                    loggedInUser: data.username,
                    history: response.lastReading
                });
            },
            'default': function(){
                res.status(406).send('Not Acceptable');
            }
        });
    }
};
