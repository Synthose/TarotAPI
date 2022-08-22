var express = require('express');
var router = express.Router();
module.exports = router;

var drawOneCard = require('./drawOneCard.js');
var drawCards   = require('./drawCards.js');
var createCard  = require('./createCard.js');
var createDeck  = require('./createDeck.js');
var gethistory  = require('./gethistory.js');
var getusers    = require('./getusers.js');
var addUser     = require('./addUser.js');
var addUserForm = require('./addUserform.js');
var login       = require('./login.js');
var dashboard = require('./dashboard.js');
var card = require('./Card.js');
var settings = require('./settings.js');
var updateSettings = require('./updateSettings.js');
var clearHistory = require('./clearHistory.js');

router.get('/' , (req, res) => {
    session = req.session;
    if(session.user)
    {
        res.redirect('dashboard');
    }
    else
    {
        res.render('landingPage');
    }
    
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});
//Post Method
router.post('/createCard', createCard);
router.post('/createDeck', createDeck);

//Drawing Cards Methods
router.get('/drawCard', drawOneCard);
router.get('/drawCard/:p', drawOneCard);

router.get('/drawCards', drawCards);
router.get('/drawCards/:p', drawCards);

//Get by ID Method
router.get('/card', card);

//Get by Username Method
router.post('/addUser', addUser);
router.get('/addUser', addUserForm);
router.post('/login', login);
router.get('/login', (req,res) => {
    if(req.session.user == null || req.session.user == undefined){
    res.render('login');
    }else{
        res.render('dashboard', {
            message: "You are already logged in!"
        });
    }
});
router.get('/users/', getusers);
router.get('/getusers', getusers);
router.get('/dashboard', dashboard);
router.get('/settings', settings);
router.post('/settings', updateSettings);

//Get User History by Username
router.get('/gethistory/:p', gethistory);
router.get('/gethistory', gethistory);
router.post('/clearHistory',clearHistory);
