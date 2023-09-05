import express from "express";
import cors from "cors";
import fs from "fs/promises";
const app = express();

app.use(express.json());
app.use(cors());

const port = 1919;

app.listen(port, () => {
	console.log(`App is running on http://localhost:${port}`);
});
app.get("/artists", async (req, res) => {
	const data = await fs.readFile("./Data/artists.json");
	const artists = JSON.parse(data);
	res.json(artists);
});
app.post("/artists", async (req, res) => {
	const data = await fs.readFile("./Data/artists.json");
	const artists = JSON.parse(data);
	const newArtist = req.body;
	newArtist.id = new Date().getTime();
	artists.push(newArtist);
	fs.writeFile("./Data/artists.json", JSON.stringify(artists));
	res.json(artists);
});

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
app.delete("/artists/:id", async (req, res) => {
	const id = Number(req.params.id);
	const data = await fs.readFile("./Data/artists.json");
	const artists = JSON.parse(data);
	let deleteArtist = artists.filter((artist) => artist.id !== id);
	fs.writeFile("./Data/artists.json", JSON.stringify(deleteArtist));
	res.json(artists);
});
