import { Router } from 'express';

import uniqid from 'uniqid';
import createError from 'http-errors';
import { validationResult } from 'express-validator';
import { getMovies, postMovies } from '../../lib/fs-tools.js';
import { moviesValidation } from '../validation.js';

const moviesRouter = Router();

moviesRouter.get('/', async (req, res, next) => {
	try {
		const movies = await getMovies();
		res.send(movies);
	} catch (error) {
		next(error);
	}
});

moviesRouter.get('/:id', async (req, res, next) => {
	try {
		const movies = await getMovies();
		const movie = movies.find((m) => m.id === req.params.id);
		if (movie) {
			res.send(movie);
		} else {
			next(createError(404, `Movie with id ${req.params.id} not found!`));
		}
	} catch (error) {
		next(error);
	}
});

moviesRouter.post('/', moviesValidation, async (req, res, next) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			next(createError(400, { errorList: errors }));
		} else {
			//await writeMoviePoster(req.file.originalname, req.file.buffer);
			const newMovie = { ...req.body, _id: uniqid(), createdAt: new Date() };
			const movies = await getMovies();
			movies.push(newMovie);
			await postMovies(movies);
			res.status(201).send({ newMovie });
		}
	} catch (error) {
		next(error);
	}
});
moviesRouter.post('/:id', async (req, res, next) => {});
moviesRouter.put('/', async (req, res, next) => {});
moviesRouter.delete('/', async (req, res, next) => {});
export default moviesRouter;
