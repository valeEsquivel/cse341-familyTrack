const passport = require("passport");

const router = require("express").Router();

router.use("/", require("./swagger"));

// router.get("/", (req, res) => {
//   //#swagger.tags = ['Hello World']
//   res.send("Welcome to the family tracker home page!");
// });

router.use("/stake", require("./stake"));
router.use("/ward", require("./ward"));
router.use("/member", require("./member"));
router.use("/ancestor", require("./ancestor"));

//Route for login
router.get('/login', passport.authenticate('github'), (req, res) => {});

//Route for logout
router.get('/logout', function(req, res, next) {
    req.logout(function(err){
        if(err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;
