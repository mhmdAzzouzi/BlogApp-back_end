const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.authenticateToken = async (req, res, next)=> {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
console.log(token)
  if (token === null) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send(err)
    req.user = user
    next()
  })
}

