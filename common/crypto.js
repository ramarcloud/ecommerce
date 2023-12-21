const crypto = require('crypto');
const jwt = require('jsonwebtoken');
var algorithm =algorithm = 'aes-256-ctr';
var password = 'your password'
var iv ='your IV'
const secretKey = 'your secretKey';


exports.encrypt = (value) => {
let cipher = crypto.createCipheriv(algorithm, password, iv);
let crypted = cipher.update(value, 'utf8', 'hex')
crypted += cipher.final('hex');
return crypted;
}

exports.decrypt = (value) => {
let decipher = crypto.createDecipheriv(algorithm, password, iv)
let dec = decipher.update(value, 'hex', 'utf8')
dec += decipher.final('utf8');
return dec;
}

exports.createPayload = (key) => {
    let payload = { subject: key }
    let token = jwt.sign(payload, secretKey, { "expiresIn": 60 * 3000 })
    return token
  }

  exports.verifyPayload = (req, res, next) => {
    if (req.headers.authorization) {
      let token = req.headers.authorization.split(' ')[1];
      if (token != null) {
        jwt.verify(token, jwtTokenUser, (err, payload) => {
          if (payload) {
            let userid = payload.subject
            req.userId = userid;
            next();
          } else {
            res.json({ "status": false, "message": "Unauthorized" })
          }
        })
      } else {
        res.json({ "status": false, "message": "Unauthorized" })
      }
    } else {
      res.json({ "status": false, "message": "Unauthorized" })
    }
  }