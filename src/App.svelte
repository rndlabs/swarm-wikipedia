<script>
  import { Router } from 'svelte-router-spa'
  import { routes } from './routes.js'
  const params = {}
</script>

<main>
  <div class='container'>
    <div class='header'>Swarm Lookup</div>  
    <Router {routes} />
  </div>
</main>

<style>
  .container{
    width: 100%;
    min-height: 100vh;

  }
  .header{
    font-size: 21px;
  }
</style>