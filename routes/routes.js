const express = require('express');
const router = express.Router()
const userController = require('../controllers/userController');
const sessionController = require ('../controllers/sessionController')
const auth = require("../middleware/auth");

// Welcome route
router.get("/", (req, res) => {
    res.status(200).json({
        "message": "success"
    })
});

// Auth
router.post('/user', userController.getUserData);
router.get('/user/:userId', auth, userController.getProfile)

//Seesion
router.post('/listenSession/:listenId', sessionController.getlistenSessionById)
router.get('/listenSessions', sessionController.getAllListenSession )
router.get('/listenSession/:userId', sessionController.getlistenSessionByUser)



module.exports = router