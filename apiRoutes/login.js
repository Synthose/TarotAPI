const User = require('../model/user.js');
module.exports = async (req , res) => {
    console.log(req.body);
    var user = await User.findOne({ username : req.body.username });
    if (user === null) { 
        return res.status(400).send({ 
            message : "User not found."
        }); 
    } 
    else { 
        if (user.validPassword(req.body.password)) { 
            return res.status(201).send({ 
                message : "User Logged In", 
            }) 
        } 
        else { 
            return res.status(400).send({ 
                message : "Wrong Password"
            }); 
        } 
    } 
};