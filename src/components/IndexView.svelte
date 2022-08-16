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
  