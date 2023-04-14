// const express = require("express");

// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");

// mongoose.connect("mongodb://localhost:27017/ecommerce_site", {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// });

// const contactSchema = {
// 	name: String,
// 	email: String,
// }


// const Contact = mongoose.model("products", contactSchema);

// const app = express();

// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(__dirname + "/public"));

// app.get("/", function (req, res) {
// 	res.send("Data");
// });

// app.post("/contact", function (req, res) {
// 	console.log("api run");
// 	console.log(req.body);
// 	const newUser = new Contact({
// 		name: req.body.name,
// 		email: req.body.email,
// 	});

// 	newUser
// 		.save()
// 		.then(() => {
// 			res.send("data added successfully");
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// });

// app.get("/data", function (req,res) {
// 	console.log("api run");

// })



// app.listen(3000, function () {
// 	console.log("App is running on Port 3000");
// });
