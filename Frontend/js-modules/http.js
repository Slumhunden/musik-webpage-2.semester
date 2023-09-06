//HTTP Requests //

const endpoint = "http://localhost:1919";

async function getArtists() {
	const response = await fetch(`${endpoint}/artists`);
	const data = await response.json();
	return data;
}

async function createArtist(name, birthdate, activeSince, genres, labels, website, image, shortDescription) {
	const newArtist = {
		name: name,
		birthdate: birthdate,
		activeSince: activeSince,
		genres: genres,
		labels: labels,
		website: website,
		image: image,
		shortDescription: shortDescription,
	};
	const artistAsJSON = JSON.stringify(newArtist);
	const response = await fetch(`${endpoint}/artists`, {
		method: "POST",
		body: artistAsJSON,
	});
	return response;
}
async function updateArtist(id, name, birthdate, activeSince, genres, labels, website, image, shortDescription) {
	const artistToUpdate = {
		id,
		name,
		birthdate,
		activeSince,
		genres,
		labels,
		website,
		image,
		shortDescription,
	};
	const artistAsJSON = JSON.stringify(artistToUpdate);
	const response = await fetch(`${endpoint}/artists/${id}`, {
		method: "PUT",
		body: artistAsJSON,
	});
    
}

async function deleteArtist(id) {
	const response = await fetch(`${endpoint}/artists/${id}`, {
		method: "DELETE",
	});

	if (response.ok) {
		updateArtistGrid();
	}
}

export { getArtists, createArtist, deleteArtist, updateArtist };
