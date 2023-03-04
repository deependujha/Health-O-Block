import { Schema, model } from 'mongoose';

const DocumentSchemaDetails = new Schema({
	fileName: {
		type: String,
		required: true,
	},
	ipfsHash: {
		type: String,
		required: true,
	},
});

const SharedDocumentSchema = new Schema({
	user: {
		type: String,
		required: true,
	},
	doctor: {
		type: String,
		required: true,
	},
	index: {
		type: Number,
		required: true,
	},
});

const UserSharedDocumentWithDoctorSchema = new Schema({
	user: {
		type: String,
		required: true,
	},
	doctor: {
		type: String,
		required: true,
	},
	accepted: {
		type: Boolean,
		required: true,
	}
});

const DocumentModelDetails = model(
	'DocumentModelDetails',
	DocumentSchemaDetails
);

const SharedDocumentModel = model('SharedDocumentModel', SharedDocumentSchema);

const UserSharedDocumentWithDoctorModel = model(
	'UserSharedDocumentWithDoctorModel',
	UserSharedDocumentWithDoctorSchema
);

export {
	DocumentModelDetails,
	SharedDocumentModel,
	UserSharedDocumentWithDoctorModel,
};
