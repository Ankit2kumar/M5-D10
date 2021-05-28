import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const { readJSON, writeJSON, writeFile, readFile, createReadStream } = fs;
const posterPicturePath = join(
	dirname(fileURLToPath(import.meta.url)),
	'../data/posterPictures'
);

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), '../data');
export const getMovies = async () =>
	await readJSON(join(dataFolderPath, 'movies.json'));
export const postMovies = async (content) =>
	await writeJSON(join(dataFolderPath, 'movies.json'), content);

export const writeMoviePoster = async (fileName, content) =>
	await writeFile(join(posterPicturePath, fileName), content);

export const readMoviesPoster = (fileName) =>
	createReadStream(join(posterPicturePath, fileName));
