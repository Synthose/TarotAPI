var User = require('../model/user.js');
module.exports = async (req , res) => {
    var user = await User.findOne({username: req.session.user});
    if(user == null || user == undefined){
        res.redirect('/login');
    }else{
        res.render('settings', {
            user: user.username,
            email: user.email
        });
    }
};