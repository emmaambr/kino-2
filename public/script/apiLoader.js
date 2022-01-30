import fetch from "node-fetch";

const API_BASE = 'https://lernia-kino-cms.herokuapp.com/api';

export async function loadMovies() {
  const res = await fetch(API_BASE + '/movies');
  const payload = await res.json();
  return payload.data;
}

export async function loadMovie(id) {
  const res = await fetch(API_BASE + '/movies/' + id);
  const payload = await res.json();
  return payload.data;
}

export async function loadScreenings() {
  const res = await fetch(API_BASE + '/screenings?populate=movie');
  const payload = await res.json();
  return payload.data;
}

export default {
  loadMovies: loadMovies,
  loadMovie: loadMovie,
  loadScreenings: loadScreenings,
};