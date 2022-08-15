var User = require('../model/user.js');
module.exports = async (req , res) => {
    var user = await User.findOne({username: req.session.user});
    if (user == null || user == undefined)
    {
        res.redirect('/login');
    }
    else
    {
        thisUser = await User.findOne({username: req.session.user});
        var newemail = req.body.email;
        var newpassword = req.body.password != "" ? thisUser.setPassword(req.body.password) : null;
        console.log(req.body.password);
        if (thisUser.hash != null || thisUser.hash != undefined){
            console.log("password changed");
            await User.updateOne({username: req.session.user}, {email: newemail, hash: thisUser.hash, salt: thisUser.salt});
        }
        else
        {
            console.log("password not changed");
            await User.updateOne({username: req.session.user}, {email: newemail});
        }
        res.redirect('/logout');
    }
};