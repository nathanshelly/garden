import type {SapperRequest, SapperResponse} from '@sapper/server'

import posts from './_posts'

const lookup = new Map()

posts.forEach(post => {
  lookup.set(post.slug, JSON.stringify(post))
})

// the `slug` parameter is available because this file is called [slug].json.js
export function get({params: {slug}}: SapperRequest, res: SapperResponse) {
  if (lookup.has(slug)) {
    res.writeHead(200, {'Content-Type': 'application/json'})

    res.end(lookup.get(slug))
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'})

    res.end(JSON.stringify({message: `Not found`}))
  }
}
