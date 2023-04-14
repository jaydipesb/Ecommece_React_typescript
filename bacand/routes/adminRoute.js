const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'public/images/'})

const adminController = require("../controllers/adminController");
const verifyToken = require("../middalware/authmiddalware");


//admin routes
router.post("/api/addProduct", upload.single('image'), adminController.addProduct);
router.get("/api/allProduct", adminController.getAllProduct);
router.get("/api/deleteProduct/:id", adminController.deleteProduct);
router.put("/api/updateProduct",upload.single('image'), adminController.updateProduct);
router.get("/api/getAllUsers",adminController.getAllUsers);


module.exports = router;