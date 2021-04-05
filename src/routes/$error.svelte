<script lang="ts">
	export let status: number;
	export let error: Error;

	import { dev } from '$app/env';
</script>

/* <svelte:head>*/ /* <title>{status}</title> */ /*</svelte:head> */

<h1>{status}</h1>

<p>{error.message}</p>

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}

<style>
	h1,
	p {
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		font-weight: 700;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>
