import { Express, Router } from 'express';
import {
	DocumentModelDetails,
	SharedDocumentModel,
	UserModel,
	UserSharedDocumentWithDoctorModel,
} from '../database/models';

const documentRouter = Router();

documentRouter.get('/:ipfsHash', async (req, res) => {
	try {
		const ipfsHash = req.params.ipfsHash;
		const myDocument = await DocumentModelDetails.findOne({ ipfsHash });

		res.send(myDocument);
	} catch (err) {
		res.send(err);
	}
});

documentRouter.post('/', async (req, res) => {
	try {
		const { ipfsHash, fileName } = req.body;
		const document = new DocumentModelDetails({ ipfsHash, fileName });
		const result = await document.save();
		res.send(result);
	} catch (err) {
		res.send(err);
	}
});

// get all documents shared with doctor
documentRouter.get('/share/:doctor', async (req, res) => {
	try {
		const doctor = req.params.doctor;
		const findDocShared = await UserSharedDocumentWithDoctorModel.find({
			doctor,
		});
		let users: any = [];
		// loop over the nominees and get the user details
		for (let i = 0; i < findDocShared.length; i++) {
			const user = await UserModel.findOne({
				walletAddress: findDocShared[i].user,
			});
			if (user) {
				users.push(user);
			}
		}
		res.send(users);
	} catch (err) {
		res.status(400).send(err);
	}
});

// get all documents shared with doctor by a user
documentRouter.get('/share/:doctor/:user', async (req, res) => {
	try {
		const { doctor, user } = req.params;
		const findDocShared = await SharedDocumentModel.find({
			doctor,
			user,
		});
		res.send(findDocShared);
	} catch (err) {
		res.status(400).send(err);
	}
});

// post the document shared with Doctor in database
documentRouter.post('/share', async (req, res) => {
	try {
		const { user, doctor, index } = req.body;
		const document = new SharedDocumentModel({ user, doctor, index });
		const result = await document.save();
		const findDocShared = await UserSharedDocumentWithDoctorModel.findOne({
			user,
			doctor,
		});
		if (!findDocShared) {
			const document = new UserSharedDocumentWithDoctorModel({
				user,
				doctor,
			});
			await document.save();
		}

		res.send('success');
	} catch (err) {
		res.status(400).send(err);
	}
});

export default documentRouter;
