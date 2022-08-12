var express = require('express');
var router = express.Router();
module.exports = router;

var drawOneCard = require('./drawOneCard.js');
var drawCards   = require('./drawCards.js');
var createCard  = require('./createCard.js');
var createDeck  = require('./createDeck.js');
var gethistory  = require('./gethistory.js');

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

