<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async function ({
		page: {
			params: { slug }
		}
	}) {
		// the `slug` parameter is available because
		// this file is called [slug].html
		const res = await this.fetch(`blog/${slug}.json`);

		if (res.status === 200) {
			return { props: { post: await res.json() } };
		} else {
			return { status: res.status, error: new Error(res.message) };
		}
	};
</script>

<script lang="ts">
	import type { Post } from './_posts';

	export let post: Post;
</script>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<header>
	<p>{post.printDate} ~ {post.printReadingTime}</p>
	<h1>{post.title}</h1>
	<hr />
</header>
<div class="container">
	<article class="content">
		{@html post.html}
	</article>
	<hr />
</div>

<style>
	header {
		text-align: center;
	}

	header h1 {
		margin-bottom: 0.7em;
	}

	header p {
		color: #aaa;
		text-transform: uppercase;
		font-family: Rubik, sans-serif;
		font-weight: 600;
	}

	header hr {
		min-width: 100px;
		width: 30%;
	}
</style>
