const jwt = require('jsonwebtoken')

function signToken(payload){
    const token = jwt.sign(payload, process.env.PRIVATE_KEY_JWT)
    return token
}

function verifyToken(token){
    const payload = jwt.verify(token, process.env.PRIVATE_KEY_JWT) 
    return payload
}

module.exports = { 
    signToken,
    verifyToken
}