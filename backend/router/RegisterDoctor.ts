import { Express, Router } from 'express';
import { DoctorModel } from '../database/models';
import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
	destination: path.join(__dirname, 'MyImages'),
	filename: (req, file, cb) => {
		cb(null, Date.now() + '---' + file.originalname);
	},
});

const doctorRouter = Router();

doctorRouter.post('/register', async (req, res) => {
	try {
		// const newDoctor = new DoctorModel({
		// 	name: 'Dr. John Doe',
		// 	email: 'drJohnDoe@gmail.com',
		// 	registrationNumber: '123456789',
		// 	walletAddress: '0x123456789',
		// 	description: 'Dr. John Doe is a doctor',
		// 	imageUrl: 'https://www.google.com',
		// });
		// await newDoctor.save();
		res.send('Express + TypeScript Server');
	} catch (err) {
		res.status(500).send(err);
	}
});

export default doctorRouter;
