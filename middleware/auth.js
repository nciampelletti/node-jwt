// require("dotenv").config()
const jwt = require("jsonwebtoken")
const { UnAuthenticatedError } = require("../errors/")

const authenticationMiddleWear = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthenticatedError("No token provided")
  }

  const [, token] = authHeader.split(" ")

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id, username } = decoded

    res.user = { id, username }
    next()
  } catch (error) {
    throw new UnAuthenticatedError("Not authorized to access this route")
  }
}

module.exports = authenticationMiddleWear
