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
                return res.status(201).send({ 
                    message : "User added successfully."
                }); 
            } 
        }); 
    }

    

};