const API_TOKEN = "Enter-your-API-KEY";

export async function getFilmwithAPI(text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr' + '&page=' + page + '&query=' + text;
    return fetch(url).then((response) => response.json()).catch((error) => console.error(error))
}

export function getImagefromApi(name) {
    return 'https://image.tmdb.org/t/p/w300' + name
}

export function getFilmDetailFromApi(id) {
    return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr')
        .then((response) => response.json())
        .catch((error) => console.error(error));
}