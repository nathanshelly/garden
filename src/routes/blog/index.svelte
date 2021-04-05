<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	import type { Post } from './_posts';
	import { loadPosts } from './_preloadPosts';
	import Posts from './Posts.svelte';

	export const load: Load = loadPosts;
</script>

<script lang="ts">
	export let posts: Post[];
</script>

<Posts {posts} />
