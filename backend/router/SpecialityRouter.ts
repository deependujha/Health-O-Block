import { Express, Router } from 'express';
import { DoctorModel, SpecialityModel } from '../database/models';

const specialityRouter = Router();

specialityRouter.get('/:speciality', async (req, res) => {
	try {
		const speciality = req.params.speciality;
		const specialityData = await SpecialityModel.find({
			speciality: speciality,
		});

		// get all the doctos with the speciality
		let doctors = [];

		for (let i = 0; i < specialityData.length; i++) {
			const walletAddress = specialityData[i].walletAddress;
			const doctorData = await DoctorModel.findOne({
				walletAddress: walletAddress,
			});

			if (doctorData !== null) {
				doctors.push(doctorData);
			}
		}
		return res.send(doctors);
	} catch (err) {
		res.status(404).send(err);
	}
});

specialityRouter.post('/', async (req, res) => {
	try {
		const speciality = req.body.speciality;
		const walletAddress = req.body.walletAddress;
		const specialityData = new SpecialityModel({
			speciality: speciality,
			walletAddress: walletAddress,
		});
		await specialityData.save();
		res.send(specialityData);
	} catch (err) {
		res.status(400).send(err);
	}
});

export default specialityRouter;
