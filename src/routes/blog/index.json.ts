import type {SapperRequest, SapperResponse} from '@sapper/server'

import posts from './_posts.js'

const contents: string = JSON.stringify(
  posts.map(({excerpt, printDate, slug, title}) => {
    return {
      title,
      slug,
      excerpt,
      printDate,
    }
  }),
)

export function get(_: SapperRequest, res: SapperResponse) {
  res.writeHead(200, {
    'Content-Type': 'application/json',
  })

  res.end(contents)
}
