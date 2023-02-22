import { Schema, model } from 'mongoose';

const DoctorSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	registrationNumber: {
		type: String,
		required: true,
	},
	walletAddress: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	imageUrl: {
		type: String,
	},
});

const DoctorModel = model('DoctorModel', DoctorSchema);
export default DoctorModel;
