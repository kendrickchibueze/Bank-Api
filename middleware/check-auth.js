const jwt = require('jsonwebtoken');


module.exports =(req, res, next) => {

    try {

     //.split(' ')[1] removes our bearer and gives us the token without the whitespace
     const token = req.headers.authorization.split(" ")[1];

      //the verification uses token and a key
     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
     req.userData = decoded
     next()

    } catch (error) {

        //auth failed shows that our token is missing
        res.status(401).json({message: 'Auth failed'})

    }

}