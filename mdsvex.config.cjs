const { join } = require('path');

const path_to_layout = join(__dirname, 'src/lib/Post.svelte');

module.exports = {
	extensions: ['.svx', '.md'],
	layout: path_to_layout,
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
