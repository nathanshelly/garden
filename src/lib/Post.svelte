<script lang="ts">
	export let title;
	export let date;
</script>

<header>
	<p>{date} ~ reading time here</p>
	<h1>{title}</h1>
	<hr />
</header>
<div class="container">
	<article class="content">
		<slot />
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
