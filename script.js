console.log("Hello");

// Constants
const API_KEY = '291cfe5e18caa2f0caa8aa14be45de48';
let API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`;

// DOM Elements
const searchForm = document.querySelector('form');
const searchInput = document.getElementById('search-input');
const moviesDiv = document.getElementById('movies-grid');
const loadMoreBtn = document.getElementById('load-more-movies-btn');
const closeSearchBtn = document.getElementById('close-search-btn');

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
        moviesDiv.appendChild(errorMessage);
        return;
      }

  movies.forEach((movie) => {
    if (!movie.poster_path) {
          // Skip movies without a poster path
     return;
    }

    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie-card');

    const title = document.createElement('h3');
    title.classList.add('movie-title');
    title.textContent = movie.title +"kbob";

    const poster = document.createElement('img');
    poster.classList.add('movie-poster');
    poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    poster.alt = movie.title;

    const votes = document.createElement('p');
    votes.classList.add('movie-votes')
    votes.textContent = `\u2B50 ${movie.vote_average}`;

    movieDiv.appendChild(poster);
    movieDiv.appendChild(votes);
    movieDiv.appendChild(title);
    
    moviesDiv.appendChild(movieDiv);
  });
}

// Function to handle form submission
async function handleFormSubmit(event) {
  event.preventDefault();
  moviesDiv.innerHTML = '';
  page = 1;
  if(searchInput.value === ""){
    API_URL =`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`;
  }else{
    API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchInput.value}`;
  }
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

//Function to close search and disply current movies
async function closeSearch(){
    page = 1;
    searchInput.value = '';
    moviesDiv.innerHTML = '';
    API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`;
    const movies =  await fetchMovies(API_URL);
    displayMovies(movies);
}

// Event listeners
searchForm.addEventListener('submit', handleFormSubmit);
loadMoreBtn.addEventListener('click', loadMoreMovies);
closeSearchBtn.addEventListener('click', closeSearch);

// Fetch movies on page load
window.addEventListener('load', async () => {
    const movies = await fetchMovies(API_URL);
    displayMovies(movies);
    loadMoreBtn.style.display = 'block';
  });
// Function to create the pop-up with movie details
function createPopup(movie) {
    const popupContainer = document.createElement('div');
    popupContainer.classList.add('popup-container');
  
    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');
  
    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.innerHTML = '&times;';
  
    closeButton.addEventListener('click', () => {
      popupContainer.remove(); // Dismiss the pop-up when the close button is clicked
    });
  
    const title = document.createElement('h3');
    title.classList.add('movie-title');
    title.textContent = movie.title;
  
    const poster = document.createElement('img');
    poster.classList.add('movie-poster-popup');
    poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    poster.alt = movie.title;
  
    const overview = document.createElement('p');
    overview.classList.add('movie-overview');
    overview.textContent = movie.overview;

    popupContent.appendChild(closeButton);
    popupContent.appendChild(title);
    popupContent.appendChild(poster)
    popupContent.appendChild(overview);
    
    popupContainer.appendChild(popupContent);
    document.body.appendChild(popupContainer);
  }
  
  // Function to handle click on movie poster or image
  function handleMovieClick(movie) {
    const { id } = movie;
  
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((movieDetails) => {
        createPopup(movieDetails);
      })
      .catch((error) => {
        console.log('Error fetching movie details:', error);
      });
  }
  
  // Function to add click event listeners to movie posters
  function addClickEventListeners() {
    const moviePosters = document.querySelectorAll('.movie-poster');
    moviePosters.forEach((poster) => {
      poster.addEventListener('click', () => {
        const movieId = poster.dataset.movieId;
        handleMovieClick({ id: movieId });
      });
    });
  }
  
  // Update the displayMovies function to add a data attribute to the movie poster element
  function displayMovies(movies) {
    if (!movies || movies.length === 0) {
      // Handle the case when no movies are returned
      const errorMessage = document.createElement('p');
      errorMessage.textContent = 'No movies found.';
      moviesDiv.appendChild(errorMessage);
      return;
    }
  
    movies.forEach((movie) => {
      if (!movie.poster_path) {
        // Skip movies without a poster path
        return;
      }
  
      const movieDiv = document.createElement('div');
      movieDiv.classList.add('movie-card');
  
      const title = document.createElement('h3');
      title.classList.add('movie-title');
      title.textContent = movie.title;
  
      const poster = document.createElement('img');
      poster.classList.add('movie-poster');
      poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      poster.alt = movie.title;
      poster.dataset.movieId = movie.id; // Add a data attribute with the movie ID
  
      const votes = document.createElement('p');
      votes.classList.add('movie-votes');
      votes.textContent = `\u2B50 ${movie.vote_average}`;
  
      movieDiv.appendChild(poster);
      movieDiv.appendChild(votes);
      movieDiv.appendChild(title);
  
      moviesDiv.appendChild(movieDiv);
    });
  
    addClickEventListeners(); // Call this function after creating movie posters to add click event listeners
  }
  