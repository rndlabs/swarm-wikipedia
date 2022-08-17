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

    import pako from 'pako'
    export let currentRoute
    let stage = 0;


    async function initialize() {

        let req = await axios.get('http://58.96.39.160:1633/bzz/94cfa31d8ba3f244ebbb95ac7f2fe57651563fe81e578dca0b0fc440d4827fef/', { responseType: "arraybuffer"});
        stage = 1;
        let uint8 = new Uint8Array(req.data);
        let uint8_inflated = pako.inflate(uint8);
        let markdown = decode_utf8(uint8_inflated)
        document.getElementById('page-content').innerHTML = markdown
        stage = 2 
        findAnchors();
    }

    function decode_utf8(uint8) {
      var result = new TextDecoder().decode(uint8);
      return result
    }
    initialize();

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
            console.log('Unhandled external link');
          }
          return false;
        })
      }
    }

  </script>



<main>

      <div class='id'>{ stage === 0 ? 'Loading' : ''} { stage === 1 ? 'Finished loading, decompressing' : ''} </div>

      <div class='page-content' id='page-content'></div>

</main>
  
  <style>

    .page-content{
      width: 100%;
      min-height: 100vh;
      background-color: white;
    }
  </style>
  