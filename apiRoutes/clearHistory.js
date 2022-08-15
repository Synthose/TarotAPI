var User = require('../model/user.js');
var Layout = require('../model/layout.js');
module.exports = async (req , res) => {
    console.log("deleting!");
    var user = await User.findOne({username: req.session.user});
    if(user == null || user == undefined){
        res.redirect('/login');
    }else{
        console.log(req.session.user);
        User.updateOne({username: req.session.user}, {layouts: []}, function(err, result){
            if(err){
                console.log(err);
            }
            else{
                console.log(result);
            }
        });
        Layout.deleteMany({username: req.session.user}, function(err){
            if(err){
                console.log(err);
            }else{
                console.log("deleted");
            }
        });
        res.redirect('/dashboard');
    }
}