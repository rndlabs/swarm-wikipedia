<script>
  import { Router } from 'svelte-router-spa'
  import { routes } from './routes.js'
  const params = {}
</script>

<main>
  <div class='container'>
    <Router {routes} />
  </div>
</main>

<style>
  .container{
    width: 100%;
    min-height: 100vh;
    padding-top: 48px;
  }
</style>