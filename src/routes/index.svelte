<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	import type { Post } from './blog/_posts';
	import { loadPosts } from './blog/_preloadPosts';
	import Posts from './blog/Posts.svelte';

	export const load: Load = loadPosts;
</script>

<script lang="ts">
	export let posts: Post[];
</script>

<Posts {posts} />
