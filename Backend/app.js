import express from "express";
import cors from "cors";
import fs from "fs/promises";
import { read } from "fs";
const app = express();

app.use(express.json());
app.use(cors());

const port = 1919;
// == Makes sure it is running on the right port == //
app.listen(port, () => {
	console.log(`App is running on http://localhost:${port}`);
});
// == Fetches the JSON file and makes the server able to read it == //
app.get("/artists", async (req, res) => {
	const data = await fs.readFile("./Data/artists.json");
	const artists = JSON.parse(data);
	res.json(artists);
});
// == Enables the function to add items to the database/JSON file == //
app.post("/artists", async (req, res) => {
	const data = await fs.readFile("./Data/artists.json");
	const artists = JSON.parse(data);
	const newArtist = req.body;
	newArtist.id = new Date().getTime();
	artists.push(newArtist);
	fs.writeFile("./Data/artists.json", JSON.stringify(artists));
	res.json(artists);
});
// == Enables the function to update the items/objects in the list of objects == //
app.put("/artists/:id", async (req, res) => {
	const id = Number(req.params.id);
	const data = await fs.readFile("./Data/artists.json");
	const artists = JSON.parse(data);
	let updateArtist = artists.find((artist) => artist.id === id);
	const body = req.body;
	updateArtist.name = body.name;
	updateArtist.birthdate = body.birthdate;
	updateArtist.genres = body.genres;
	updateArtist.activeSince = body.activeSince;
	updateArtist.labels = body.labels;
	updateArtist.website = body.website;
	updateArtist.image = body.image;
	updateArtist.shortDescription = body.shortDescription;
	fs.writeFile("./Data/artists.json", JSON.stringify(artists));
	res.json(artists);
});
// == Able to remove items/objects from the database/JSON file == //
app.delete("/artists/:id", async (req, res) => {
	const id = Number(req.params.id);
	const data = await fs.readFile("./Data/artists.json");
	const artists = JSON.parse(data);
	let deleteArtist = artists.filter((artist) => artist.id !== id);
	fs.writeFile("./Data/artists.json", JSON.stringify(deleteArtist));
	res.json(artists);
});
// == Helpfunction for backend Favorites list == //

async function readFavorites() {
	const data = await fs.readFile("./Data/favorites.json");
	const favoriteID = await JSON.parse(data);
	return favoriteID;
}
// == Enabels the function to add an artist to the list of favorites in the backend == //
app.get("/favorites", async (req, res) => {
	const favoriteID = await readFavorites();
	const artists = await readArtists();
	const favorites = artists.filter((artist) => favoriteID.includes(artist.id));
	res.json(favorites);
});

app.post("/favorites", async (req, res) => {
	const favoID = req.body.id;
	const favs = await readFavorites();

	if (!favs.includes(favoID)) {
		favs.push(favoID);
		writeFavorites(favs);
	}
	const artists = await readArtists();
	const favorites = artists.filter((artist) => favs.includes(artist.id));
	res.json(favorites);
});
app.delete("/favorites/:id", async (req, res) => {
	const favoID = Number(req.params.id);
	const favs = await readFavorites();

	if (favs.includes(favoID)) {
		const newFavs = favs.filter((id) => id !== favoID);
		writeFavorites(newFavs);

		const artists = await readArtists();
		const favorites = artists.filter((artist) => newFavs.includes(artist.id));
		res.json(favorites);
	}
});
async function writeFavorites(listOfFavorites) {
	fs.writeFile("./Data/favorites.json", JSON.stringify(listOfFavorites));
}

async function readArtists() {
	const data = await fs.readFile("./Data/artists.json");
	const artists1 = await JSON.parse(data);
	return artists1;
}
