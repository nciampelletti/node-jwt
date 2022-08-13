const express = require("express")
const router = express.Router()
const authMiddleWear = require("../middleware/auth")

const { login, dashboard } = require("../controllers/main")

router.route("/dashboard").get(authMiddleWear, dashboard)
router.route("/login").post(login)

module.exports = router
