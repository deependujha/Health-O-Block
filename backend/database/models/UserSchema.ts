import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	walletAddress: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
	},
});

const UserModel = model('UserModel', UserSchema);
export default UserModel;
