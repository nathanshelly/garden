<script lang="ts">
	export let title: string;
	export let date: string;
	/* import type { Post } from './_posts'; */
	/* export let posts: Post[]; */
</script>

<svelte:head>
	<title>mostly dotfiles</title>
</svelte:head>

<div class="wrapper">
	<div class="container">
		{#each posts as post, index}
			{#if index}
				<hr />
			{/if}
			<div class="post-item">
				<h2>{title}</h2>
				<p>
					<slot>
						<!-- the mdsvex content will be slotted in here -->
					</slot>
				</p>
				<div class="post-item-footer">
					<span class="post-item-date">— {date}</span>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	h2,
	.post-item-footer {
		font-family: Rubik, sans-serif;
		font-weight: 700;
	}

	.post-item-date {
		color: #aaa;
		text-align: left;
		text-transform: uppercase;
		margin-right: 16px;
	}

	hr {
		margin: 60px auto;
	}

	.wrapper {
		display: flex;

		justify-content: space-between;
		align-items: center;
		flex-direction: column;
	}
</style>
