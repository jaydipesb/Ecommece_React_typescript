
const Jwt = require('jsonwebtoken');
const jwtKey = 'jaydip';



let verifyToken = async (req, res, next) => {
    let token = req.headers['authorization'];
    if(token){
        token = token.split(' ')[1];
        // token = token;
          Jwt.verify(token, jwtKey, (err, valid) => {
            if(err){
                res.status(401).send({result: "Please provide valid token "})
            }else{
                console.log("token match successfully");
                next();
            }
          })
    }else{
        res.status(403).send({result: "Please add token with header"})
    }

}

module.exports = verifyToken;