const CustomAPIError = require("../errors/custom-error")
const { StatusCodes } = require("http-status-codes")

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  // return res.status(500).send("Something went wrong try again later")
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message)
}

module.exports = errorHandlerMiddleware
