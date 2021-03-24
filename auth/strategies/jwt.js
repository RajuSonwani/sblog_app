const jwt = require('jsonwebtoken');

// UserInfo will be in this form { email: "my cool @email" }
function generateAccessToken(userInfo) {
    const {id, name, email} = userInfo;
    // token expiration  {1 hour}
    return jwt.sign({ id, name, email }, process.env.SECRET_KEY, { expiresIn: '2h' });
}

function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    // console.log(req.headers)
    var authHeader = req.query.token || req.body.token || req.headers.cookie //||req.headers.authorization
    // console.log(authHeader);
    var token = authHeader && authHeader.split(' ')[0] //[1]
    // console.log(token)
    if (token == undefined) {
        return res.send({"error": "token not found!"})
        next()
    }
    try {
        if (token.startsWith('key=')) {
            token = token.slice(4, token.length);
            // console.log(token);
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            req.decode = decoded;
            // console.log(decode)
            next(); 
        }

    } catch (error) {
        return error
        // return res.json(error);
        next()        
    }
}

module.exports = { generateAccessToken, authenticateToken };
