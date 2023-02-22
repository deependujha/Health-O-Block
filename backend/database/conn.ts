import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

mongoose
	.connect('mongodb://localhost:27017/ayushmanBharat')
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((err: Error) => {
		console.log('Error connecting to MongoDB', err.message);
	});
