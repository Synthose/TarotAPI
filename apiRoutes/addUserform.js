
module.exports = async (req , res) => {
    if(req.session.user == null || req.session.user == undefined){
        res.render('addUserForm');
    }else{  
        res.render('dashboard', {
            message: "You are already logged in!"
        });
    }
}