const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
let User = require("../models/User");
const { comparePassword, generateToken } = require('../models/User');
let Token = require('../models/Token');
const { sendEmail } = require("../util/mail");
require('dotenv').config()

router.route("/").get((req, res) => {
	User.find()
		.then((patients) => res.send(patients))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.post("/add", (req, res) => {
	const email = req.body.email;
	bcrypt.genSalt(process.env.BCRPYT_KEY, (err, salt) =>
		bcrypt.hash(req.body.password, salt, (err, hash) => {
			if (err) {
				console.log(err);
				res.status(500).json(`Error: ${err}`);
				return;
			}
			//console.log(hash);
			const User = new User({
				firstname: req.body.firstname,
				email: email,
				password: hash,
			});

			User.save()
				.then(() => {
					res.satus(200).json("User added");
					sendEmail(user.email, firstname, "register", user.verifyToken);
				})
				.catch((err) =>
					res.status(400).json(`Error: ${err}`)
				);
		})
	);
});

router.route('/activate').post((req, res) => {
	console.log(req.body.token);
	User.findOne({
		verifyToken: req.body.token
	}).then(user => {
		user.isVerified = true;
		user.save();
		res.send(user)
	})
		.catch(err => res.status(400).json(`Error: ${err}`));
})

module.exports = router;
