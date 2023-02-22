import { Express, Router } from 'express';
import { DoctorModel } from '../database/models';
import multer, { diskStorage } from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	destination: path.join(__dirname, '../MyImages/doctors'),
	filename: (req, file, cb) => {
		cb(null, Date.now() + '---' + file.originalname);
	},
});

const doctorRouter = Router();

doctorRouter.post('/register', async (req, res) => {
	try {
		let uploadImage = multer({ storage }).single('image');
		uploadImage(req, res, async function (err) {
			// these lines will be executed only if there's an error
			if (!req.file) {
				return res.send('please select an image to upload');
			} else if (err instanceof multer.MulterError) {
				return res.send(err);
			} else if (err) {
				return res.send(err);
			} else {
				const { name, email, walletAddress, description } = req.body;
				const newDoctor = new DoctorModel({
					name,
					email,
					walletAddress,
					description,
					imageUrl: req.file.filename,
				});
				await newDoctor.save();
				return res.send('image uploaded successfully');
			}
		});
	} catch (err) {
		return res.send(err);
	}
});

export default doctorRouter;
