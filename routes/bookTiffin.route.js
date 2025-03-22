const express  = require("express")
const router = express.Router()

const bookTiffinController = require("../controllers/bookTiffin.controller")

router.route('/').post(bookTiffinController.bookTiffin)

module.exports = router