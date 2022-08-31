import IndexView from './components/IndexView.svelte'

const routes = {
    // Exact path
    '/': IndexView,

    // Using named parameters
    '/:lang/wiki/:article?': IndexView,

    // Catch-all
    '*': IndexView
}

export { routes }