import type { Load } from '@sveltejs/kit';

import type { Post } from './_posts';

export const loadPosts: Load = async function ({ fetch }) {
	const res = await fetch('blog.json');
	const posts: Post[] = await res.json();
	// console.log('posts: ', posts);
	return { props: { posts } };
};
