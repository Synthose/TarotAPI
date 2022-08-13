const Card = require('../model/card.js');
const User = require('../model/user.js');
const Layout = require('../model/layout.js');

module.exports = async (req , res) => {
    if (req.query.key == "admin"){
        var users = await User.find({});
        var response = new Object();
        response.users = users.map(function(user){
            var userObject = new Object();
            userObject.username = user.username;
            userObject.email = user.email;
            userObject.creationDate = user.creationDate.toLocaleString();
            userObject.readingcount = user.layouts.length;
            return userObject;
        });
        res.format ( {
            'text/plain': function() {
                res.send(response);
            },
            'application/json': function() {
                res.send(response);
            },
            'text/html': function() {
                res.render('users', {
                    users: response.users
                });
            },
            'default': function() {
                res.status(406).send('Not Acceptable');
            }
        });
    }
    else
    {
        res.send("Not authorized");
    }
};