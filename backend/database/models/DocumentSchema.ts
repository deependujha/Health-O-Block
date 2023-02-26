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

const DocumentModelDetails = model(
	'DocumentModelDetails',
	DocumentSchemaDetails
);
export { DocumentModelDetails };
