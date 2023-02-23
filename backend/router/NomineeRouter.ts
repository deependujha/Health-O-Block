import { Express, Router } from 'express';
import { NomineeModel } from '../database/models';
import { UserModel } from '../database/models';

type NomineeModelType = {
	user: string;
	nominee: string;
};

type UserType = {
	_id: string;
	name: string;
	email: string;
	walletAddress: string;
	imageUrl: string;
};

const nomineeRouter = Router();

nomineeRouter.get('/', async (req, res) => {
	try {
		const { user, nominee } = req.query;
		const myNominee = await NomineeModel.findOne({ user, nominee });
		if (nominee === null) {
			return res.send('No nominee found');
		}
		if (myNominee) {
			return res.send(myNominee);
		} else {
			return res.send('No nominee found');
		}
	} catch (err) {
		res.send(err);
	}
});

nomineeRouter.post('/', async (req, res) => {
	try {
		const { user, nominee } = req.body;
		const newNominee = new NomineeModel({
			user,
			nominee,
		});

		await newNominee.save();
		res.send('success');
	} catch (err) {
		res.send(err);
	}
});

nomineeRouter.delete('/', async (req, res) => {
	try {
		const { user, nominee } = req.query;
		await NomineeModel.findOneAndDelete({ user, nominee });
		res.send('done');
	} catch (err) {
		res.send(err);
	}
});

nomineeRouter.get('/:user', async (req, res) => {
	try {
		const { user } = req.params;
		const myNominees = await NomineeModel.find({ user });

		let users: any = [];
		// loop over the nominees and get the user details
		for (let i = 0; i < myNominees.length; i++) {
			const user = await UserModel.findOne({
				walletAddress: myNominees[i].nominee,
			});
			if (user) {
				users.push(user);
			}
		}
		res.send(users);
	} catch (err) {
		res.send(err);
	}
});

export default nomineeRouter;
