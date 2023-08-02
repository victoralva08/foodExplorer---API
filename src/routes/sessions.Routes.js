const { Router } = require("express")

const SessionsController = require('../controllers/sessionsController')
const sessionsController = new SessionsController()

const sessionsRoutes = Router()
sessionsRoutes.post('/', sessionsController.create)

module.exports = sessionsRoutes