import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import marked from 'marked'
import svelte from 'rollup-plugin-svelte'
import {terser} from 'rollup-plugin-terser'
import config from 'sapper/config/rollup.js'
import sveltePreprocess from 'svelte-preprocess'

import pkg from './package.json'

const mode = process.env.NODE_ENV
const dev = mode === 'development'
const legacy = !!process.env.SAPPER_LEGACY_BUILD

const onwarn = (warning, onwarn) =>
  (warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
  (warning.code === 'CIRCULAR_DEPENDENCY' &&
    /[/\\]@sapper[/\\]/.test(warning.message)) ||
  warning.code === 'THIS_IS_UNDEFINED' ||
  onwarn(warning)

const markdown = () => ({
  transform(md, id) {
    if (!/\.md$/.test(id)) return null
    const data = marked(md)
    return {
      code: `export default ${JSON.stringify(data.toString())};`,
    }
  },
})

export default {
  client: {
    input: config.client.input().replace(/\.js$/, '.ts'),
    output: config.client.output(),
    plugins: [
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      svelte({
        compilerOptions: {dev, hydratable: true},
        preprocess: sveltePreprocess({sourceMap: dev}),
      }),
      resolve({dedupe: ['svelte']}),
      commonjs(),
      typescript({sourceMap: dev}),

      legacy &&
        babel({
          extensions: ['.js', '.mjs', '.html', '.svelte'],
          babelHelpers: 'runtime',
          exclude: ['node_modules/@babel/**'],
          presets: [['@babel/preset-env', {targets: '> 0.25%, not dead'}]],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            ['@babel/plugin-transform-runtime', {useESModules: true}],
          ],
        }),

      !dev && terser({module: true}),
    ],

    preserveEntrySignatures: false,
    onwarn,
  },

  dev,

  server: {
    input: {server: config.server.input().server.replace(/\.js$/, '.ts')},
    output: {
      ...config.server.output(),
      // TODO: look into turning source maps back on. need to figure out
      // Markdown parser handling. Not sure why this is only erroring for server
      sourcemap: false,
    },
    plugins: [
      replace({
        'process.browser': false,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      svelte({
        compilerOptions: {dev, hydratable: true, generate: 'ssr'},
        preprocess: sveltePreprocess({sourceMap: false}),
      }),
      resolve({dedupe: ['svelte']}),
      commonjs(),
      markdown(),
      typescript({sourceMap: false}),
    ],
    external: Object.keys(pkg.dependencies).concat(
      require('module').builtinModules,
    ),

    preserveEntrySignatures: 'strict',
    onwarn,
  },

  serviceworker: {
    input: config.serviceworker.input().replace(/\.js$/, '.ts'),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      commonjs(),
      typescript({sourceMap: dev}),
      !dev && terser(),
    ],

    preserveEntrySignatures: false,
    onwarn,
  },
}
