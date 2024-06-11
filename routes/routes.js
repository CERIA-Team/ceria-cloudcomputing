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

//
router.post('/startSession', sessionController.startSession)


module.exports = router