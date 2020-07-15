const express = require('express');
const nodemailer = require("nodemailer");
require('dotenv').config();

const app = express();

app.get('/send', async (req,res) => {
	let transporter = nodemailer.createTransport({
		service: "gmail",
		host: "smtp.google.com",
		secure: false,
		port: 587,
		auth: {
			user: process.env.GMAIL_USER,
			pass: process.env.GMAIL_PASS,
		},
	});

	let info = await transporter.sendMail({
		from: '"Sender Name" <sender_name@gmail.com>',
		to: "receiver_name@gmail.com",
		subject: "Hey dude!",
		text: "longtime no see:)", // using plain text
		html: "<p>longtime no see:)</p>", // using html
	}, (error,info) => {
		if(error) {
			console.log(error);
			res.json(error);
		} else {
			console.log("email is send");
			console.log(info);
			res.json(info)
		}
	});
});

app.listen(3000, () => console.log('Server running on PORT 3000'));
