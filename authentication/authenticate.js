const authCheck = (req, res, next) => {
    if (req.session.user === undefined){
        console.log(req.session);
        return res.status(401).json('You do not have access.');
    };
    next();
};

module.exports = {
    authCheck
}