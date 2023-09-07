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
	console.log(newArtist);
	const artistAsJSON = JSON.stringify(newArtist);
	const response = await fetch(`${endpoint}/artists`, {
		method: "POST",
		body: artistAsJSON,
		headers: {
			"Content-Type": "application/json",
		},
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
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
}

async function deleteArtist(id) {
	const response = await fetch(`${endpoint}/artists/${id}`, {
		method: "DELETE",
	});
	return response;
}
// == Add to favorites == //
async function fetchFavorites() {
	const response = await fetch(`${endpoint}/favorites`);
	const data = await response.json();
	return data;
}
async function addToFavorites(id) {
	const newFavorite = {
		id: id,
	};
	const newFavAsJSON = JSON.stringify(newFavorite);
	const response = await fetch(`${endpoint}/favorites`, {
		method: "POST",
		body: newFavAsJSON,
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
}
async function removeFromFavorites(id) {
	const response = await fetch(`${endpoint}/favorites/${id}`, {
		method: "DELETE",
	});
	return response;
}

export { getArtists, createArtist, deleteArtist, updateArtist, fetchFavorites, addToFavorites,removeFromFavorites };
