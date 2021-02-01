<script context="module" lang="ts">
  import type {Preload} from '@sapper/common'

  import type {Post} from './_posts'
  import {preloadPosts} from './_preloadPosts'
  import Posts from './Posts.svelte'

  export const preload: Preload = preloadPosts
</script>

<script lang="ts">
  export let posts: Post[]
</script>

<Posts {posts} />
