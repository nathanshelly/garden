module.exports = {
	extensions: ['.svx', '.md'],
	layout: './src/lib/Post.svelte',
	smartypants: {
		dashes: 'oldschool'
	},
	remarkPlugins: [
		[
			require('remark-github'),
			{
				// Use your own repository
				repository: 'https://github.com/svelte-add/mdsvex.git'
			}
		],
		require('remark-abbr')
	],
	rehypePlugins: [
		require('rehype-slug'),
		[
			require('rehype-autolink-headings'),
			{
				behavior: 'wrap'
			}
		]
	]
};
