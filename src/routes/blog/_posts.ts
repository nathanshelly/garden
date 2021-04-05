//import fs from 'fs';
//// import formatDate from 'date-fns/format';
//// import marked from 'marked';
//import path from 'path';
//import prism from 'prismjs';
//// import readingTime from 'reading-time';

//// Support JSX syntax highlighting
//import 'prismjs/components/prism-jsx.min';

//const cwd = process.cwd();
//const POSTS_DIR = path.join(cwd, 'src/routes/blog/posts/');
//// const EXCERPT_SEPARATOR = '<!-- more -->';
//// const renderer = new marked.Renderer();
//const linkRenderer = renderer.link;

//renderer.link = (href: any, title: any, text: any) => {
//	const html = linkRenderer.call(renderer, href, title, text);

//	if (href.indexOf('/') === 0) {
//		// Do not open internal links on new tab
//		return html;
//	} else if (href.indexOf('#') === 0) {
//		// Handle hash links to internal elements
//		const html = linkRenderer.call(renderer, 'javascript:;', title, text);
//		return html.replace(/^<a /, `<a onclick="document.location.hash='${href.substr(1)}';" `);
//	}

//	return html.replace(/^<a /, '<a target="_blank" rel="nofollow" ');
//};

//renderer.code = (code, language) => {
//	const parser = prism.languages[language] || prism.languages.html;
//	const highlighted = prism.highlight(code, parser, language);
//	return `<pre class="language-${language}"><code class="language-${language}">${highlighted}</code></pre>`;
//};

//marked.setOptions({ renderer });

//export type Post = {
//	title: string;
//	slug: string;
//	html: string;
//	date: Date;
//	excerpt: string;
//	printDate: string;
//	printReadingTime: string;
//};

//const posts: Post[] = fs
//	.readdirSync(POSTS_DIR)
//	.filter((fileName) => /\.md$/.test(fileName))
//	.map((fileName) => {
//		const fileMd = fs.readFileSync(path.join(POSTS_DIR, fileName), 'utf8');
//		// const {
//		//   attributes: {title, date},
//		//   body: rawContent,
//		// } = fm(fileMd)
//		// const slug = fileName.split('.')[0]
//		// let content = rawContent
//		// let excerpt = ''

//		// if (rawContent.indexOf(EXCERPT_SEPARATOR) !== -1) {
//		//   const splittedContent = rawContent.split(EXCERPT_SEPARATOR)
//		//   excerpt = splittedContent[0]
//		//   content = splittedContent[1]
//		// }

//		// const rawHtml = marked(content)
//		// const html = rawHtml.replace(/^\t{3}/gm, '')

//		// const readingStats = readingTime(content)
//		// const printReadingTime = readingStats.text
//		// const printDate = formatDate(new Date(date), 'MMMM d, yyyy')

//		// return {
//		//   title: title || slug,
//		//   slug,
//		//   html,
//		//   date,
//		//   excerpt,
//		//   printDate,
//		//   printReadingTime,
//		// }
//		//
//		return {
//			title: '',
//			slug: '',
//			html: '',
//			date: '',
//			excerpt: '',
//			printDate: '',
//			printReadingTime: ''
//		};
//	});

//posts.sort((a, b) => {
//	const dateA = new Date(a.date);
//	const dateB = new Date(b.date);

//	if (dateA > dateB) return -1;
//	if (dateA < dateB) return 1;
//	return 0;
//});

//export default posts;
