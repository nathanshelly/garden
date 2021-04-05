import type { RequestHandler } from '@sveltejs/kit';

import posts from './_posts.js';

const contents: string = JSON.stringify(
	posts.map(({ excerpt, printDate, slug, title }) => ({
		title,
		slug,
		excerpt,
		printDate
	}))
);

export const get: RequestHandler = () => ({
	status: 200,
	body: contents
});
