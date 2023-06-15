console.log("Hello");


// Constants
const API_KEY = '291cfe5e18caa2f0caa8aa14be45de48';
let API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`;

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
    if (!movies || movies.length === 0) {
        // Handle the case when no movies are returned
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'No movies found.';
        gifsDiv.appendChild(errorMessage);
        return;
      }


  movies.forEach((movie) => {
    if (!movie.poster_path) {
          // Skip movies without a poster path
     return;
    }
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
  API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchInput.value}`;
  const movies = await fetchMovies(API_URL);
  displayMovies(movies);
  loadMoreBtn.style.display = 'block';
}

// Function to load more movies
async function loadMoreMovies() {
  page++;
  const movies = await fetchMovies(API_URL);
  displayMovies(movies);
}

// Event listeners
searchForm.addEventListener('submit', handleFormSubmit);
loadMoreBtn.addEventListener('click', loadMoreMovies);

// Fetch movies on page load
window.addEventListener('load', async () => {
    const movies = await fetchMovies(API_URL);
    displayMovies(movies);
    loadMoreBtn.style.display = 'block';
  });