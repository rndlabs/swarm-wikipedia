<svelte:head>  
  <link href="./static/mw/ext.cite.ux-enhancements.css" rel="stylesheet" type="text/css">
  <link href="./static/mw/ext.tmh.player.css" rel="stylesheet" type="text/css">
  <link href="./static/mw/ext.scribunto.logs.css" rel="stylesheet" type="text/css">
  <link href="./static/mw/ext.cite.styles.css" rel="stylesheet" type="text/css">
  <link href="./static/mw/ext.tmh.player.styles.css" rel="stylesheet" type="text/css">
  <link href="./static/mw/skins.minerva.base.reset|skins.minerva.content.styles|ext.cite.style|site.styles|mobile.app.pagestyles.android|mediawiki.page.gallery.styles|mediawiki.skinning.content.parsoid.css" rel="stylesheet" type="text/css">
  <link href="./static/style.css" rel="stylesheet" type="text/css">
  <link href="./static/content.parsoid.css" rel="stylesheet" type="text/css">
  <link href="./static/inserted_style.css" rel="stylesheet" type="text/css">
  <script src="./static/script.js"></script>
  <script src="./static/masonry.min.js"></script>
  <script src="./static/article_list_home.js"></script>
  <script src="./static/images_loaded.min.js"></script>
  <script src="./static/node_module/details-element-polyfill/dist/details-element-polyfill.js"></script>
</svelte:head>

<script lang="ts">
    import axios from 'axios'
    import { onMount } from 'svelte';
    import pako from 'pako'
    import {push, pop, replace} from 'svelte-spa-router'

    // The params prop contains values matched from the URL
    export let params;

    // construct the base uri using the protocol
    // the host
    // the port if not the default port for the protocol
    // the path

    const BASE_URI = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    // const BASE_URI = "http://bee.swarm.public.dappnode:1633/bzz/61a4a1073a19c273ac0cdf663a1d4d83c01ef01bdbb60db596975f2518b28593/"

    let currentURI = ''

    window.onhashchange = function() {
        // onyl execute if window.location.hash starts with #/en/wiki/
        // console.log(window.location);
        if (window.location.hash.startsWith('#/en/wiki/')) {
            // get the article name from the hash
            let articleName = window.location.hash.substring(window.location.hash.lastIndexOf('/') + 1);
            // console.log('article name', articleName);
            // set the currentURI
            currentURI = BASE_URI + 'wiki/'+ articleName;
            // console.log('currentURI', currentURI);
            initialize();
        }
    };

    let isLoading = true;
    onMount(() => {
      // if routeParams.article is set, set the currentURI to BASE_URI + /wiki/ + routeParams.article
        // console.log(currentRoute.childRoute.namedParams);
        // if params is set and the article is set, set the currentURI to BASE_URI + /wiki/ + article
        if (params && params.article) {
            currentURI = BASE_URI + 'wiki/' + params.article;
            initialize();
        } else {
            // if no article is set, set the currentURI to BASE_URI + /wiki/Home
            push('/en/wiki/Index');
        }
    });

    async function initialize() {
        isLoading = true;
        if(currentURI.length < 1){
          isLoading = false;
          return;
        }
        try{
          let req = await axios.get(currentURI, { responseType: "arraybuffer"});
          let uint8 = new Uint8Array(req.data);
          let uint8_inflated = pako.inflate(uint8);
          let markdown = decode_utf8(uint8_inflated)
          document.getElementById('page-content').innerHTML = markdown
          isLoading = false;
          findAnchors();
          fixImages();
        }catch(e){
          if(e.request.status === 404){
            // @ts-ignore
            push('/en/wiki/Index');
          }
        }
        
    // toggleDarkmode();
    }

    function decode_utf8(uint8) {
      var result = new TextDecoder().decode(uint8);
      return result
    }

    function fixImages(){
      let imgs = document.getElementsByTagName('img');
      for(let i = 0; i < imgs.length; i++){
        let newURL = document.createAttribute('src')
        newURL.value = BASE_URI + imgs[i].attributes.getNamedItem('src').value
        imgs[i].attributes.setNamedItem(newURL)
      }
    }

    function findAnchors(){
        let anchors = document.getElementsByTagName('a');

        // iterate over all anchors
        // if the anchor is not a hash, add "#/en/wiki/" to the href
        for(let i = 0; i < anchors.length; i++){
            let href = anchors[i].getAttribute('href');
            if (!String(href).startsWith('http')){
                // console.log('here');
                anchors[i].setAttribute('href', '#/en/wiki/' + href);

                anchors[i].addEventListener('click', (event) => {
                    event.preventDefault();
                    // @ts-ignore
                    const href = event.currentTarget.getAttribute('href');
                    // determine how many times a hash appears in a string
                    const hashCount = (href.match(/\#/g) || []).length;
                    // if there are more than one hash, get the very substring from the last hash to the end of the string
                    if(hashCount > 1){
                        // @ts-ignore
                        const hash = href.substring(href.lastIndexOf('#'));
                        // console.log('hash: ' + hash);
                        // @ts-ignore
                        const target_id = String(hash).substring(1);
                        const target = document.getElementById(target_id);
                        target.scrollIntoView();
                    } else {
                        // console.log('no hash, href: ' + href);
                        push(href);
                        // scroll to the top of the page smoothly
                        window.scroll({
                            top: 0,
                            left: 0,
                            behavior: 'smooth'
                        });
                    }
                    return false;
                })
            }
        }
    }
</script>

<main>
  <div class={isLoading ? 'loader' : 'loader-hidden'}><div class="spinner"></div></div>
  <div class='page-content' id='page-content'></div>
</main>
  
<style>
    .page-content{
      width: 100%;
      min-height: 100vh;
      background-color: white;
    }
</style>
  