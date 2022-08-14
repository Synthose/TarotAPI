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
var login       = require('./login.js');
var dashboard = require('./dashboard.js');

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

//Post Method
router.post('/createCard', createCard);
router.post('/createDeck', createDeck);

//Drawing Cards Methods
router.get('/drawCard', drawOneCard);
router.get('/drawCard/:p', drawOneCard);

router.get('/drawCards', drawCards);
router.get('/drawCards/:p', drawCards);

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
})

//Get by Username Method
router.post('/addUser', addUser);
router.post('/login', login);
router.get('/login', (req,res) => {
    res.render('login');
});
router.get('/users/', getusers);
router.get('/getusers', getusers);
router.get('/dashboard', dashboard);

//Get User History by Username
router.get('/gethistory/:p', gethistory);



//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})

