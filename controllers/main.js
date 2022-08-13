// require("dotenv").config()
const jwt = require("jsonwebtoken")

const { BadRequest } = require("../errors/")

const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    throw new BadRequest("Please provide email and password")
  }

  //just for demo, normally provided by DB as id or something else
  const id = new Date().getDate()

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })

  res.status(200).json({
    msg: "User created",
    token,
  })
}

const dashboard = async (req, res) => {
  const luckynumber = Math.floor(Math.random() * 100)

  res.status(200).json({
    msg: `Helo, ${res.user.username}`,
    secret: `Here is your number: ${luckynumber}`,
  })
}

module.exports = { login, dashboard }
