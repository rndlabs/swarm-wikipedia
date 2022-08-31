<script>
  import Router from 'svelte-spa-router'
  import { routes } from './routes'
  import IndexView from './components/IndexView.svelte'

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