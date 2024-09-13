
const express = require('express');
const router = express.Router();
const jwtAuthMiddleware = require('../jwt.js');
const userController = require('../controller/user.controller.js');


router.post("/signup", userController.register);
router.post("/login", userController.login);
router.get("/profile",jwtAuthMiddleware, userController.getUserprofile);
router.get("/alluser",jwtAuthMiddleware, userController.getAllUsers);
router.put("/change/password",jwtAuthMiddleware, userController.changePassword);
router.put("/change/address",jwtAuthMiddleware, userController.updateAddress);



module.exports = router;