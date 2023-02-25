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

// get a user based on his wallet address
doctorRouter.get('/:walletAddress', async (req, res) => {
	try {
		const { walletAddress } = req.params;
		const user = await DoctorModel.findOne({ walletAddress });
		if (user === null) return res.send('user not found');
		return res.send(user);
	} catch (err) {
		return res.send(err);
	}
});

doctorRouter.get('/image/:imgName', async (req, res) => {
	try {
		const { imgName } = req.params;
		const imagePath = path.join(__dirname, '../MyImages/doctors', imgName);
		return res.sendFile(imagePath);
	} catch (err) {
		res.send(err);
	}
});

export default doctorRouter;
