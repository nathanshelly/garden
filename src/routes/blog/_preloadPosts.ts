import type {Preload} from '@sapper/common'

import type {Post} from './_posts'

export const preloadPosts: Preload = async function (this) {
  const res = await this.fetch('blog.json')
  const posts: Post[] = await res.json()
  return {posts}
}
