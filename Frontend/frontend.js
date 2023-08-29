"use strict";
window.addEventListener("load",initApp)

let artists;
const endpoint = "http://localhost:1919"

async function initApp(){
    const artists = await fetch(endpoint)
    updateArtistsGrid();
}