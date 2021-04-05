import type { RequestHandler } from '@sveltejs/kit';

import posts from './_posts';

const lookup = new Map();

posts.forEach((post) => {
	lookup.set(post.slug, JSON.stringify(post));
});

// the `slug` parameter is available because this file is called [slug].json.js
export const get: RequestHandler = async ({ params: { slug } }) => {
	if (lookup.has(slug)) {
		return {
			status: 200,
			body: lookup.get(slug)
		};
	}
};
