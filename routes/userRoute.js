const express = require("express");
const {
  loginController,
  registerController,
  deleteUserController
} = require("../controllers/usersController");

//router object
const router = express.Router();

//routers
// POST || LOGIN USER
router.post("/login", loginController);

//POST || REGISTER USER
router.post("/register", registerController);

//POST || DELETE USER
router.post("/deleteUser", deleteUserController)

module.exports = router;
