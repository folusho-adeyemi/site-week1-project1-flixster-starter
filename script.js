console.log("Hello");


// Constants
const API_KEY = '291cfe5e18caa2f0caa8aa14be45de48';
const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`;

// DOM Elements
const searchForm = document.querySelector('form');
const searchInput = document.getElementById('searchInput');
const gifsDiv = document.getElementById('gifsDiv');
const loadMoreBtn = document.getElementById('loadMoreBtn');

let page = 1;

// Function to fetch movies from the API
async function fetchMovies() {
  try {
    const response = await fetch(`${API_URL}&page=${page}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log('Error fetching movies:', error);
  }
}

// Function to create movie elements and append them to the HTML
function displayMovies(movies) {
  movies.forEach((movie) => {
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');

    const title = document.createElement('h2');
    title.textContent = movie.title;

    const poster = document.createElement('img');
    poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    poster.alt = movie.title;

    const votes = document.createElement('p');
    votes.textContent = `Votes: ${movie.vote_count}`;

    movieDiv.appendChild(title);
    movieDiv.appendChild(poster);
    movieDiv.appendChild(votes);

    gifsDiv.appendChild(movieDiv);
  });
}

// Function to handle form submission
async function handleFormSubmit(event) {
  event.preventDefault();
  gifsDiv.innerHTML = '';
  page = 1;
  const movies = await fetchMovies();
  displayMovies(movies);
  loadMoreBtn.style.display = 'block';
}

// Function to load more movies
async function loadMoreMovies() {
  page++;
  const movies = await fetchMovies();
  displayMovies(movies);
}

// Event listeners
searchForm.addEventListener('submit', handleFormSubmit);
loadMoreBtn.addEventListener('click', loadMoreMovies);

