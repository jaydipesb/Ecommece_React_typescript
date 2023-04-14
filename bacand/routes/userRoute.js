const express = require("express");
const router = express.Router();
const bod = require("body-parser");
const path = require("path");

const userControllers = require("../controllers/userController");
const verifyToken = require("../middalware/authmiddalware");


//authentication routes
router.post("/api/register", userControllers.registerUser);
router.post("/api/login", userControllers.loginUser);

module.exports = router;



//student routes
// router.get("/api/get", userControllers.getAllStudent);
// router.post("/api/post", userControllers.addStudentData);
// router.delete("/api/remove/:id", userControllers.deleteStudent);
// router.get("/api/get/:id", userControllers.getEditstudent);
// router.put("/api/update/:id", userControllers.updateStudent);

//status and filter api
// router.put("/api/updatestatus/:id", userControllers.updateStudentStatus);
// router.get("/api/data/:status", userControllers.filterStatus);