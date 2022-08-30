<svelte:head>  
  <link rel="canonical" href="https://en.wikipedia.org/wiki/Australia">
  <link href="../-/mw/ext.cite.ux-enhancements.css" rel="stylesheet" type="text/css">
  <link href="../-/mw/ext.tmh.player.css" rel="stylesheet" type="text/css">
  <link href="../-/mw/ext.scribunto.logs.css" rel="stylesheet" type="text/css">
  <link href="../-/mw/ext.cite.styles.css" rel="stylesheet" type="text/css">
  <link href="../-/mw/ext.tmh.player.styles.css" rel="stylesheet" type="text/css">
  <link href="../-/mw/skins.minerva.base.reset|skins.minerva.content.styles|ext.cite.style|site.styles|mobile.app.pagestyles.android|mediawiki.page.gallery.styles|mediawiki.skinning.content.parsoid.css" rel="stylesheet" type="text/css">
  <link href="../-/style.css" rel="stylesheet" type="text/css"><link href="../-/content.parsoid.css" rel="stylesheet" type="text/css"><link href="../-/inserted_style.css" rel="stylesheet" type="text/css">
  <script src="../-/script.js"></script><script src="../-/masonry.min.js"></script><script src="../-/article_list_home.js"></script><script src="../-/images_loaded.min.js"></script><script src="../-/node_module/details-element-polyfill/dist/details-element-polyfill.js"></script>

</svelte:head>

<script>
    import axios from 'axios'
    import { onMount } from 'svelte';
    import pako from 'pako'

    let currentURI = ''
    let isLoading = true;
    const BASE_URI = 'http://58.96.39.160:1633/bzz/886edc68280664dd077acbd4a0ec1bae30669cb842181b3907ab81797ebc9323/'
    onMount(() => {
      const pathname = window.location.pathname
      if(pathname === '/wiki/index'){
        currentURI = BASE_URI + '/wiki/index'
      }else if(pathname.startsWith('/wiki')){
        currentURI = BASE_URI + pathname 
      } else {
        currentURI = BASE_URI + '/wiki/index'
      }

      initialize()
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
            window.location = '/wiki/index'
          }
        }
        
    // toggleDarkmode();
    }

    function fixImages(){
      let imgs = document.getElementsByTagName('img');
      for(let i = 0; i < imgs.length; i++){
        let newURL = document.createAttribute('src')
        newURL.value = 'http://58.96.39.160:1633/bzz/886edc68280664dd077acbd4a0ec1bae30669cb842181b3907ab81797ebc9323/' + imgs[i].attributes.getNamedItem('src').value
        imgs[i].attributes.setNamedItem(newURL)
      }
    }

    

    function toggleDarkmode(){
      let q = document.querySelectorAll('div')

      for(let i = 0; i < q.length; i++){
        q[i].style.backgroundColor = '#333'
        q[i].style.color = 'white'
      }

      let a = document.querySelectorAll('a')
      for(let x = 0; x < a.length; x++){
        a[x].style.color = '#5fffe1'
      }

      let tables = document.querySelectorAll('table')
      for(let i = 0; i < tables.length; i++){
        tables[i].style.backgroundColor = '#333';
      }

    }

    function decode_utf8(uint8) {
      var result = new TextDecoder().decode(uint8);
      return result
    }
    // initialize();

    function findAnchors(){
      let anchors = document.getElementsByTagName('a');

      for(let i = 0; i < anchors.length; i++){
        anchors[i].addEventListener('click', (event) => {
          event.preventDefault();
          // @ts-ignore
          const href = event.currentTarget.getAttribute('href');
          if(String(href).startsWith('#')){
            const target_id = String(href).substring(1);
            const target = document.getElementById(target_id);
            target.scrollIntoView();
          }else{
            currentURI = 'http://58.96.39.160:1633/bzz/886edc68280664dd077acbd4a0ec1bae30669cb842181b3907ab81797ebc9323/wiki/' + href
            initialize();
          }
          return false;
        })
      }
    }


  </script>



<main>
  <div class='fixed-menu'>
    <div class='fixed-menu-line'></div>
    <div class='fixed-menu-line'></div>
  </div>
  <div class={isLoading ? 'loader' : 'loader-hidden'}><div class="spinner"></div></div>
  <div class='page-content' id='page-content'></div>
</main>
  
  <style>

    .page-content{
      width: 100%;
      min-height: 100vh;
      background-color: white;
    }

    .fixed-menu-line{
      height: 3px;
      width: 60%;
      background: white;
    }
    .fixed-menu{
      width: 36px;
      height: 36px;
      border-radius: 36px;
      display: flex;
      flex-direction: column;
      gap: 5px;
      align-items: center;
      justify-content: center;
      position: fixed;
      top: 0;
      right: 0;
      background-color: black;
      z-index: 10;
      margin: 12px;
    }

    


  </style>
  