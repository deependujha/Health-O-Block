import { Schema, model } from 'mongoose';

const SpecialitySchema = new Schema({
	walletAddress: {
		type: String,
		required: true,
	},
	speciality: {
        type: String,
        required: true,
	},
});

const SpecialityModel = model('SpecialityModel', SpecialitySchema);
export default SpecialityModel;
