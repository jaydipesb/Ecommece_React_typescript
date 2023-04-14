const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
require('dotenv').config({ path: './.env' });
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public/images', express.static('public/images'))

const multer = require('multer');
const upload = multer({dest: 'public/images/'})

const studentRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");

app.use("/", studentRoute);
app.use("/", adminRoute);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});