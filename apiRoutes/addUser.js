const User = require('../model/user.js');
module.exports = async (req , res) => {
    let user = await User.findOne({username: req.body.username});
    if(user){
        res.send("User already exists");
    }else{ 
        let newUser = new User();
        newUser.username= req.body.username;
        newUser.password= newUser.setPassword(req.body.password);
        newUser.email= req.body.email;
        newUser.creationDate= new Date();
        newUser.layouts= [];
        console.log(newUser);
        newUser.save((err, User) => { 
            if (err) { 
                return res.status(400).send({ 
                    message : "Failed to add user."
                }); 
            } 
            else { 
                res.format({
                    'text/plain': function(){
                        res.send("User added");
                    },
                    'application/json': function(){
                        res.send(User);
                    },
                    'text/html': function(){
                        console.log("redirecting");
                        res.render('login');
                    }
                }); 
            } 
        }); 
    }
};