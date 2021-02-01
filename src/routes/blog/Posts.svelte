<script lang="ts">
  import type {Post} from './_posts'
  export let posts: Post[]
</script>

<style>
  h2,
  .post-item-footer {
    font-family: Rubik, sans-serif;
    font-weight: 700;
  }

  .post-item-date {
    color: #aaa;
    text-align: left;
    text-transform: uppercase;
    margin-right: 16px;
  }

  hr {
    margin: 60px auto;
  }

  .wrapper {
    display: flex;

    justify-content: space-between;
    align-items: center;
    flex-direction: column;
  }
</style>

<svelte:head>
  <title>mostly dotfiles</title>
</svelte:head>

<div class="wrapper">
  <div class="container">
    {#each posts as post, index}
      {#if index}
        <hr />
      {/if}
      <div class="post-item">
        <h2><a sapper:prefetch href="blog/{post.slug}">{post.title}</a></h2>
        <p>{post.excerpt}</p>
        <div class="post-item-footer">
          <span class="post-item-date">— {post.printDate}</span>
        </div>
      </div>
    {/each}
  </div>
</div>
