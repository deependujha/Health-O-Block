import './database/conn';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { DoctorRouter } from './router';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/doctor', DoctorRouter);

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
