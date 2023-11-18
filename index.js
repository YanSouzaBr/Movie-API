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

const myKey = "dd5fbdf276f6ba22e292624f2ffe02d7";
const searchMovieInput = document.getElementById("search-movie-input");
const searchButton = document.getElementById("search-button");
const mainDiv = document.getElementById("main");
const mainIcon = document.querySelector(".mainIcon");
const showMoreButton = document.getElementById("show-more-button");
showMoreButton.style.display = "none";


searchButton.addEventListener("click", function() {

    if (searchMovieInput.value === "") {
        alert("Please enter a movie name");
        return;
    } else {
        showMoreButton.disabled = false;
        mainDiv.innerHTML = "";
        mainIcon.style.display = "none";

fetch(`https://api.themoviedb.org/3/search/movie?query=${searchMovieInput.value}&api_key=${myKey}`)
    .then(res => res.json())
    .then(data => {

        for (let item of data.results.slice(0, 9)) {
            fetch(`https://api.themoviedb.org/3/movie/${item.id}?api_key=${myKey}`)
                .then(res => res.json())
                .then(movieData => {

                    const genreIds = item.genre_ids;
                    const genreNames = genreIds.map(genreId => genreLookup[genreId]).join(", ");
                    const filmDiv = document.createElement("div");


                    filmDiv.innerHTML = `

                    <div class="content">

                        <img class="poster" src="https://image.tmdb.org/t/p/w500${item.poster_path}">

                        <div class="descriptions">
                            <h1 class="title">${item.original_title}</h1>
                            
                            <div class="options">
                                <p>${movieData.runtime} <br> minutes</p>
                                <p>${genreNames}</p>
                                <button class="add-btn"><img class="icon" src="icons/add.png">Watchlist</button>
                            </div>

                            </div>
                        </div>
                            <p class="overview">${item.overview}</p>
                    <hr/>
                    `;
                    showMoreButton.style.display = "block";

                    const addBtn = filmDiv.querySelector(".add-btn");

                    addBtn.addEventListener("click", function() {
                        const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

                        watchlist.push(movieData);
                        localStorage.setItem("watchlist", JSON.stringify(watchlist));
                        addBtn.textContent = "Added ✅"; 
                    });
                    mainDiv.appendChild(filmDiv);
                });
        }
    });
}});



console.log("Made by Yan Silva (2023)");
showMoreButton.addEventListener("click", function() {
    showMoreButton.style.display = "none";
    fetch(`https://api.themoviedb.org/3/search/movie?query=${searchMovieInput.value}&api_key=${myKey}`)
    .then(res => res.json())
    .then(data => {

        for (let item of data.results.slice(10, 20)) {
            fetch(`https://api.themoviedb.org/3/movie/${item.id}?api_key=${myKey}`)
                .then(res => res.json())
                .then(movieData => {

                    const genreIds = item.genre_ids;
                    const genreNames = genreIds.map(genreId => genreLookup[genreId]).join(", ");
                    const filmDiv = document.createElement("div");

                    filmDiv.innerHTML = `

                    <div class="content">

                        <img class="poster" src="https://image.tmdb.org/t/p/w500${item.poster_path}">

                        <div class="descriptions">

                            <h1 class="title">${item.original_title}</h1>                   
                            <div class="options">
                                <p>${movieData.runtime} <br> minutes</p>
                                <p>${genreNames}</p>
                                <button class="add-btn"><img class="icon" src="icons/add.png">Watchlist</button>
                            </div>

                        </div>

                    </div>
                            <p class="overview">${item.overview}</p>
                    <hr/>
                    `;

                    const addBtn = filmDiv.querySelector(".add-btn");

                    addBtn.addEventListener("click", function() {
                        const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

                        watchlist.push(movieData);
                        localStorage.setItem("watchlist", JSON.stringify(watchlist));
                        addBtn.textContent = "Added ✅"; 
                    });
                    mainDiv.appendChild(filmDiv);
                });
        }
    });
});





