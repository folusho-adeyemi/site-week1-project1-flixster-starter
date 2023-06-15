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

// const apiKey = '291cfe5e18caa2f0caa8aa14be45de48';
// const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}`;
// let pageNumber = 1;

// function fetchMovies(page) {
//     const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&page=${page}`;
//     console.log(url);
//     fetch(url)
//         .then(response => response.json())
//         .then(data => displayMovies(data.results))
//         .catch(error => console.error(error));
// }
// function displayMovies(movies) {
//     const gifsDiv = document.getElementById('gifsDiv');

//     movies.forEach(movie => {
//         const movieDiv = document.createElement('div');
//         movieDiv.classList.add('movie');

//         const title = document.createElement('h3');
//         title.textContent = movie.title;

//         const poster = document.createElement('img');
//         poster.src = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;
//         poster.alt = movie.title;

//         const votes = document.createElement('p');
//         votes.textContent = `Votes: ${movie.vote_count}`;

//         movieDiv.appendChild(title);
//         movieDiv.appendChild(poster);
//         movieDiv.appendChild(votes);

//         gifsDiv.appendChild(movieDiv);
//     });
// }
// function loadMoreMovies() {
//     pageNumber++;
//     fetchMovies(pageNumber);
// }

// document.getElementById('searchInout').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const searchInput = document.getElementById('searchInput');
//     const searchQuery = searchInput.value;
    
//     // Perform your search API call here with the searchQuery
    
//     // Clear the search input value
//     searchInput.value = '';
// });

// document.getElementById('loadMoreBtn').addEventListener('click', loadMoreMovies);

// // Fetch the initial movies on page load
// fetchMovies(pageNumber);