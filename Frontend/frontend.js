import { getArtists, createArtist, updateArtist, deleteArtist } from "./js-modules/http.js";
import { sortArtist, filterArtist } from "./js-modules/sorting.js";
window.addEventListener("load", initApp);

let artists;
let selectedArtist;

function initApp() {
	console.log("app is running");
	updateArtistsGrid();

	document.querySelector("#form-create").addEventListener("submit", createArtistClicked);
	document.querySelector("#form-update").addEventListener("submit", updateArtistClicked);
	document.querySelector("#filter-by").addEventListener("change", filterByChanged);
	document.querySelector("#sort-by").addEventListener("change", sortByChanged);
}

async function updateArtistsGrid() {
	artists = await getArtists();
	displayArtists(artists);
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
	document.querySelector("#artists article:last-child .btn-update").addEventListener("click", () => selectArtist(artist));
}
// == CRUD click functions == //
function selectArtist(artist) {
	selectedArtist = artist;
	const form = document.querySelector("#form-update");
	form.name.value = artist.name;
	form.birthdate.value = artist.birthdate;
	form.activeSince.value = artist.activeSince;
	form.labels.value = artist.labels;
	form.genres.value = artist.genres;
	form.image.value = artist.image;
	form.website.value = artist.website;
	form.shortDescription.value = artist.shortDescription;
	form.scrollIntoView({ behavior: "smooth" });
}

async function updateArtistClicked(event) {
	event.preventDefault();
	const name = event.target.name.value;
	const birthdate = event.target.birthdate.value;
	const activeSince = event.target.activeSince.value;
	const genres = event.target.genres.value;
	const labels = event.target.labels.value;
	const shortDescription = event.target.shortDescription.value;
	const image = event.target.image.value;
    const website = event.target.website.value
	const response = await updateArtist(selectedArtist.id, name, birthdate, activeSince, genres, labels, website, image, shortDescription);

	if (response.ok) {
		updateArtistGrid();
		scrollToTop();
	}
}
async function createArtistClicked(event) {
	event.preventDefault();
	const form = event.target;
	const name = form.name.value;
	const birthdate = form.birthdate.value;
	const activeSince = form.activeSince.value;
	const genres = form.genres.value;
	const labels = form.labels.value;
	const shortDescription = form.shortDescription.value;
	const website = form.website.value;
	const image = form.image.value;
	console.log(name, birthdate, activeSince, genres, labels, shortDescription, image);
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

// == Sort function == //
function sortByChanged(event) {
	const selectedValue = event.target.value;
	displayArtists(sortArtist(artists, selectedValue));
}
// == Filter function == //
function filterByChanged(event) {
	const selectedValue = event.target.value;
	displayArtists(filterArtist(artists, selectedValue));
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
