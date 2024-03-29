import { Express, Router } from 'express';
import { UserModel } from '../database/models';
import multer, { diskStorage } from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	destination: path.join(__dirname, '../MyImages/users'),
	filename: (req, file, cb) => {
		cb(null, Date.now() + '---' + file.originalname);
	},
});

const userRouter = Router();

userRouter.post('/register', async (req, res) => {
	try {
		let uploadImage = multer({ storage }).single('image');
		uploadImage(req, res, async function (err) {
			// these lines will be executed only if there's an error
			if (!req.file) {
				return res.send('please select an image to upload');
			} else if (err instanceof multer.MulterError) {
				return res.send(`multer error occurred: ${err}`);
			} else if (err) {
				return res.send(`some error occurred: ${err}`);
			} else {
				const { name, email, walletAddress } = req.body;
				const newUser = new UserModel({
					name,
					email,
					walletAddress,
					imageUrl: req.file.filename,
				});
				await newUser.save();
				return res.send('image uploaded successfully');
			}
		});
	} catch (err) {
		return res.send(err);
	}
});

// get a user based on his wallet address
userRouter.get('/:walletAddress', async (req, res) => {
	try {
		const { walletAddress } = req.params;
		const user = await UserModel.findOne({ walletAddress });
		if (user === null) return res.send('user not found');
		return res.send(user);
	} catch (err) {
		return res.send(err);
	}
});

userRouter.get('/image/:imgName', async (req, res) => {
	try {
		const { imgName } = req.params;
		const imagePath = path.join(__dirname, '../MyImages/users', imgName);
		return res.sendFile(imagePath);
	} catch (err) {
		res.send(err);
	}
});
		

export default userRouter;
