module.exports = async (req , res) => {
    console.log("dashboard")
    console.log(req.session);
    res.render('dashboard', {
        user: req.session.user
    });
};