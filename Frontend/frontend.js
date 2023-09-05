"use strict";
const endpoint = "./backend/data";
window.addEventListener("load", initApp);

let artists;

async function initApp() {
	console.log("app is running");
	artists = await getArtists();
	console.log(artists);
	displayArtists(artists);
}

function displayArtists(listOfArtists) {
	document.querySelector("#artists").innerHTML = "";

	for (const artist of listOfArtists) {
		displayArtist(artist);
	}
}
function displayArtist(artist) {
	document.querySelector("#artists").insertAdjacentHTML(
		"beforeend",
		/*html*/ `
		<article class="grid-item">
			<img src="">
			<section class="transparent-user">
				<h2>${artist.name}</h2>
				<p>Birthdate: ${artist.birthdate}</p>
				<p>Active Since: ${artist.activeSince}</p>
				<p>Genres: ${artist.genres}</p>
				<p>Labels: ${artist.labels}</p>
				<a href=${artist.website}>Website:</a></a>
				<p>Description: ${artist.shortDescription}</p>
			</section>
			<section class="btns">
				<button class="btn-delete">Delete</button>
				<button class="btn-update">Update</button>
			</section>
		</article>
	`
	);
}




