import { Schema, model } from 'mongoose';

const NomineeSchema = new Schema({
	user: {
		type: String,
		required: true,
	},
	nominee: {
		type: String,
		required: true,
	},
});

const NomineeModel = model('Nominee', NomineeSchema);
export default NomineeModel;
