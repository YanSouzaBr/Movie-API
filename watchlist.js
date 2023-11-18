const genreLookup = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    53: "Thriller",
    10752: "War",
    37: "Western",
    10770: "TV Movie",
  };
  
  const myWatchlist = document.getElementById("my-watchlist");
  
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  
  watchlist.forEach((item, index) => {
    const genres = item.genres.map(genre => genreLookup[genre.id]).join(", ");
    myWatchlist.innerHTML += `
      <div class="content" id="movie-${index}">

        <img class="poster" src="https://image.tmdb.org/t/p/w500${item.poster_path}">

        <div class="descriptions">
          <h1 class="title">${item.original_title}</h1>

          <div class="options">
            <p>${item.runtime} <br> minutes</p>
            <p>${genres}</p>
            <button class="remove-btn" id="remove-${index}"><img class="icon" src="icons/remove.png">Remove</button>
          </div>

        </div>
      </div>
          <p id="overview-${index}" class="overview">${item.overview}</p>
      <hr id="hr-${index}"/>
    `;
  });
  
  watchlist.forEach((item, index) => {

    const removeButton = document.getElementById(`remove-${index}`);
    const overview = document.getElementById(`overview-${index}`)
    const hr = document.getElementById(`hr-${index}`)

    removeButton.addEventListener('click', function() {
      watchlist.splice(index, 1);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      const movieElement = document.getElementById(`movie-${index}`);
      if (movieElement) {
        movieElement.remove();
      }
      overview.style.display = "none"
      hr.style.display = "none"
    });
  });


const nothing = document.getElementById("nothing")

if (watchlist.length === 0) {
    nothing.style.display = "block"
} else {
    nothing.style.display = "none"
}