import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mysql2 from 'mysql2/promise';
import mailer from 'nodemailer';
import registration from './server/registration.js';
import apartments from './server/apartments.js';
import flats from './server/flats.js';
import residences from './server/residences.js';
import crypto from 'crypto'
import multer from 'multer';


const smtpTransport = mailer.createTransport(
	{
		host: 'smtp.mail.ru',
		port: 465,
		secure: true,
		auth: {
			user: process.env.MAILER_USER,
			pass: process.env.MAILER_PASSWORD,
		},
		tls: { rejectUnauthorized: false },
	},
	{ from: 'registrationtestmail01 <registrationtestmail01@mail.ru>' },
);

const sendEmail = (message) => {
	smtpTransport.sendMail(message, (error, info) => {
		if (error) {
			console.log(error);
		} else {
			console.log('success', info);
		}
		smtpTransport.close();
	});
};

dotenv.config({ path: './.env' });

const corsOptions = {
	origin: 'https://makarochkin.ru',//(https://your-client-app.com)
	optionsSuccessStatus: 200,
};
// const cert = Certificate();
const app = express();
const pool = mysql2.createPool({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	database: process.env.DATABASE,
	password: process.env.DATABASE_PASSWORD,
});
app.use(multer().any());
app.use(cors(corsOptions));
app.use(express.json()); //для того что бы использовать req.body
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

registration(app, pool);
apartments(app, pool);
flats(app, pool);
residences(app, pool);


app.post('/reset_user', async (req) => {
	const token = crypto.randomUUID();
	const timestamp = new Date().getTime();
	await pool.query('INSERT INTO reseters SET ?', {
		email: req.body.email,
		token: token,
		timestamp: timestamp,
	}).then((data) => {
		res.json(data[0]);
	});
	sendEmail({
		to: req.body.email,
		subject: `pismo s saita`,
		text: `http://91.197.98.253:5173/reset/${token}`,
	});
});

app.get("/check_reset/:token", function (req, res) {
	console.log(req.params, 'req');
	pool.query(`SELECT * FROM reseters WHERE reseters.token = ?`, req.params.token).then((data) => {
		if (!data[0].length) return res.json({status : false});
		return res.json({status : true});
	});
});


app.get('/check_user_reset/:id', function (req, res) {
	const isDateAvailable = new Date(Number(req.params.id));
	pool
	.query(`SELECT * FROM reseters WHERE reseters.token = ?`, req.params.id)
		.then((data) => {
			// const isAvailiableDate = data[0];
			console.log(isDateAvailable, 'isAvailiableDate');
			res.json(data[0]);
		});
	});
	
	// app.get("/check_videos/:userId/:courseId", function (req, res) {
	// 	console.log(req.params, 'req');
	// 	pool.query(`SELECT * FROM wathed_videos WHERE wathed_videos.user_id = ${req.params.userId} AND wathed_videos.course_id = ${req.params.courseId} `).then((data) => {
	// 		res.json(data[0]);
	// 	});
	// });

app.listen(8086, function () {
	console.log('started');
});
