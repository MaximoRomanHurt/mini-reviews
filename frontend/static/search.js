const API = "http://localhost:4000/api";

async function loadResults() {
  const q = new URLSearchParams(window.location.search).get("q");

  const res = await fetch(`${API}/search?q=${encodeURIComponent(q)}`);
  const data = await res.json();

  const movieC = document.getElementById("movieResults");
  const tvC = document.getElementById("tvResults");

  movieC.innerHTML = "";
  tvC.innerHTML = "";

  data.movies.forEach(m => {
    movieC.innerHTML += `
      <div class="media-card">
        <a href="/movie/${m.movieId}">
          <img src="${m.posterPath}" />
          <h3>${m.title}</h3>
          <p>${m.year}</p>
        </a>
      </div>
    `;
  });

  data.tv.forEach(t => {
    tvC.innerHTML += `
      <div class="media-card">
        <a href="/tv/${t.tvId}">
          <img src="${t.posterPath}" />
          <h3>${t.title}</h3>
          <p>${t.year}</p>
        </a>
      </div>
    `;
  });
}

loadResults();
