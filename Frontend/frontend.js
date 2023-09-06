import { getArtists, createArtist, updateArtist, deleteArtist } from "./js-modules/http.js";

window.addEventListener("load", initApp);

let artists;

async function initApp() {
	console.log("app is running");
	artists = await getArtists();
	displayArtists(artists);

	document.querySelector("#form-create").addEventListener("submit", createArtistClicked);
	document.querySelector("#form-update").addEventListener("submit", updateArtistClicked);
}
// == Displays the objects == //
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
			<img src="${artist.image}">
			<section>
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
                <button class="btn-favorite">favorite</button>
			</section>
		</article>
	`
	);
	document.querySelector("#artists article:last-child .btn-delete").addEventListener("click", () => deleteArtistClicked(artist.id));
	document.querySelector("#artists article:last-child .btn-update").addEventListener("click", () => updateArtistClicked(artist));
}
// == CRUD click functions == //
async function updateArtistClicked(event) {
	event.preventDefault();
	const name = event.target.name.value;
	const birthdate = event.target.birthdate.value;
	const activeSince = event.target.activeSince.value;
	const genres = event.target.genres.value;
	const labels = event.target.labels.value;
	const shortDescription = event.target.shortDescription.value;
	const image = event.target.image.value;
	const response = await updateArtist(id, name, birthdate, activeSince, genres, labels, website, image, shortDescription);

	if (response.ok) {
		updateArtistGrid();
		scrollToTop();
	}
}
async function createArtistClicked(event) {
	event.preventDefault();
	const name = event.target.name.value;
	const birthdate = event.target.birthdate.value;
	const activeSince = event.target.activeSince.value;
	const genres = event.target.genres.value;
	const labels = event.target.labels.value;
	const shortDescription = event.target.shortDescription.value;
	const image = event.target.image.value;
	const response = await createArtist(name, birthdate, activeSince, genres, labels, website, image, shortDescription);

	if (response.ok) {
		form.reset();
		console.log("Artist added to list");
		updateArtistGrid();
		scrollToTop();
	}
}

async function deleteArtistClicked(id) {
	const response = await deleteArtist(id);
	if (response.ok) {
		updateArtistGrid();
	}
}
// == Visually shows the CRUD updates/deletes that has happened == //
async function updateArtistGrid() {
	const artists = await getArtists();
	displayArtists(artists);
}
// == Simple nice to have == //
function scrollToTop() {
	window.scrollTo({ top: 0, behavior: "smooth" });
}
