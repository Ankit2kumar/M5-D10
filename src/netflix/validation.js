import { body } from 'express-validator';

export const moviesValidation = [
	body('title').exists().withMessage('Title is mandatory!'),
	body('year')
		.exists()
		.withMessage('Movie Year is mandatory!')
		.isNumeric()
		.withMessage('Movie year needs to be a valid year!'),
	body('poster')
		.exists()
		.withMessage('Movie Poster is mandatory!')
		.isURL()
		.withMessage('Movie Poster requires valid image URL!'),
];
