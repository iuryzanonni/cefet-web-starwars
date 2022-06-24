// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução

import { play } from "./music.js";
import { restartAnimation } from "./restart-animation.js";

const API_ENDPOINT = 'https://swapi.dev/api';
const API_ROUTE = '/films/';
const URL_AUDIO = 'audio/tema-sw.mp3';
const URL_IMAGE = 'imgs/logo.svg';

play({
  audioUrl: URL_AUDIO,
  coverImageUrl: URL_IMAGE,
  title: 'Intro',
  artist: 'John Williams',
}, document.body);

const decimalToRoman = (int) => {
  const number = {
      1: "I  ",
      2: "II ",
      3: "III",
      4: "IV ",
      5: "V  ",
      6: "VI ",
  };

  return number[int];
};

const handleFilms = () => {
  const url = API_ENDPOINT + API_ROUTE;
  fetch(url)
  .then(response => response.json())
  .then(data => setFilms(data.results))
  .catch(err => console.log(err));
}

const setFilms = (results) => {
  let films = [];

  results.map((movie) => films.push({
    id: movie.episode_id,
    title: movie.title,
    opening_crawl: movie.opening_crawl
  }));
  films = films.sort((a, b) => (a.id > b.id ? 1 : -1));
  appendChild(films);
}

const appendChild = (films) => {
  const ul = document.getElementById('filmes').children[0];
  ul.innerHTML = '';
  console.log(films);
  console.log(ul);
  films.map((movie) => {
    const li = document.createElement('li');
    li.innerHTML = `Episode ${decimalToRoman(movie.id)} - ${movie.title}`;
    li.addEventListener('click', () => changedCrawlText(movie));
    ul.appendChild(li);
  });
};

const changedCrawlText = (movie) => {
  const crawlText = document.getElementsByTagName("pre")[0];
  crawlText.innerHTML = `Episode ${decimalToRoman(movie.id)}\n ${movie.title.toUpperCase()}\n\n ${movie.opening_crawl}}`
  restartAnimation(crawlText);
}

handleFilms();



