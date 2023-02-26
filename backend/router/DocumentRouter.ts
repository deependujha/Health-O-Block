import { Express, Router } from 'express';
import { DocumentModelDetails } from '../database/models';

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

export default documentRouter;
