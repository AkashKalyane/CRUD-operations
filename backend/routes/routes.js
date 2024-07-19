const express = require("express");

const controllers = require("../controllers/controllers");

const router = express.Router();

router.get("/user/:uid", controllers.getUserById);

router.get("/", controllers.getUsers);

router.post("/", controllers.createUser);

router.patch("/:uid", controllers.updateUser);

router.delete("/:uid", controllers.deleteUser);

module.exports = router;
