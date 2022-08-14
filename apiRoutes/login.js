const sessions = require('express-session');
const User = require('../model/user.js');
module.exports = async (req , res) => {
    var session;
    console.log(req.body);
    var user = await User.findOne({ username : req.body.username });
    if (user === null) { 
        return res.status(400).send({ 
            message : "User not found."
        }); 
    } 
    else { 
        if (user.validPassword(req.body.password)) { 
            session = req.session;
            session.user = req.body.username;
            console.log(req.session);
            res.format({
                'text/plain': function(){
                    res.send("Logged in");
                },
                'application/json': function(){
                    res.send(req.session);
                },
                'text/html': function(){
                    console.log("redirecting");
                    res.redirect('/');
                }
            }); 
        }   
        else { 
            return res.status(400).send({ 
                message : "Wrong Password"
            }); 
        } 
    } 
};