const {body, validationResult} = require('express-validator');

let Validation = async (req, res, next) => {

    body('email','Enter a valid email').isLength({min:3}),
    body('password','password muse be atlease 5 character').isLength({min:5})
    let errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();

}

module.exports = Validation;