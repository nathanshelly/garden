<style>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    min-height: 100vh;
  }

  h1 {
    margin: 1em 0;
    text-align: center;
  }

  main {
    flex: 1;
    position: relative;
    margin: 0 auto;
    max-width: 1400px;
    background-color: white;
    padding: 1em 2em;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  footer {
    color: #AAA;
    font-size: 1em;
    font-family: Rubik, sans-serif;
    margin: 1em auto;
    max-width: 1400px;
    padding: 1em 2em;
    text-align: center;
    width: 100%;
  }
</style>

<div class="layout">
  <a href="."><h1>mostly dotfiles writings</h1></a>

  <main>
    <slot></slot>
  </main>

  <footer>
    <a href="https://github.com/nathanshelly">
      <img id='github-logo' src="GitHub-Mark-32px.png" alt="GitHub account">
    </a>
  </footer>
</div>
