const express  = require("express")
const router = express.Router()

const adminController = require("../controllers/admin.controller")
const authenticate = require("../middlewares/authenticate.middleware")

router.route('/deliveries').get(authenticate,adminController.getDeliveries)
router.route('/assign-rider').post(authenticate,adminController.assignRider)

module.exports = router