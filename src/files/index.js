import express from 'express';
import { writeMoviePoster, readMoviesPoster } from '../lib/fs-tools.js';
import multer from 'multer';
import { pipeline } from 'stream';
import zlib from 'zlib';

const filesRouter = express.Router();

filesRouter.post(
	'/upload',
	multer().single('posterPic'),
	async (req, res, next) => {
		try {
			console.log(req.file);
			await writeMoviePoster(req.file.originalname, req.file.buffer);
			res.send();
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
);

filesRouter.post(
	'/uploadMultiple',
	multer().array('multipleProfilePic', 2),
	async (req, res, next) => {
		try {
			const arrayOfPromises = req.files.map((file) =>
				writeMoviePoster(file.originalname, file.buffer)
			);

			await Promise.all(arrayOfPromises);
			res.send();
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
);

filesRouter.get('/:fileName/download', async (req, res, next) => {
	try {
		res.setHeader(
			'Content-Disposition',
			`attachment; filename=${req.params.fileName}.gz`
		);

		const source = readMoviesPoster(req.params.fileName);
		const destination = res;

		pipeline(source, zlib.createGzip(), destination, (err) => next(err));
	} catch (error) {
		next(error);
	}
});

export default filesRouter;
