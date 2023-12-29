const jwt = require("jsonwebtoken")
const middlewares = {
    AUTH_MIDDLEWARE: (req, res, next) => {
        
        try {
            const token = req.headers.authorization.split(" ")[1];
            const isUserLogin = jwt.verify(token, 'isUserLogin');
            if (isUserLogin._doc) {
                next()
            }
        } catch (error) {
            res.status(404).send("Please Login to Continue !")
        }
    }
}

module.exports = middlewares