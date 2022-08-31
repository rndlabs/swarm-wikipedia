# Wikipedia on Swarm

This is a simple site that uses the Wikipedia on `zim` styling to enable browsing of a Wikipedia archive that's uploaded and stored on Ethereum Swarm.

Broadly speaking, this site simply:

1. Wraps the history and intercepts history transitions for browsing.
2. Using a predetermined path from the `mantaray` manifest that has been uploaded, URLs are rewritten and requested via Axios.
3. The response takes into account that the articles have been uploaded with gzip encoding, therefore in Javascript, the file is then inflated.

# Contributors

Fellow programmer @SergeiKanerva contributed greatly to the development of the front-end, researching libraries for quick execution of inflation and small compile size, suitable for Ethereum Swarm.