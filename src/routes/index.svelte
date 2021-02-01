<script context="module" lang="ts">
  import type {Preload} from '@sapper/common'

  import type {Post} from './blog/_posts'
  import {preloadPosts} from './blog/_preloadPosts.ts'
  import Posts from './blog/Posts.svelte'

  export const preload: Preload = preloadPosts
</script>

<script lang="ts">
  export let posts: Post[]
</script>

<Posts {posts} />
