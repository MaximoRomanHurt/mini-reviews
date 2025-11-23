const API = "http://localhost:4000/api";

document.getElementById("filterForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  loadResults();
});

async function loadResults() {
  const type = document.getElementById("type").value;
  const genre = document.getElementById("genre").value;
  const year = document.getElementById("year").value;
  const platform = document.getElementById("platform").value;
  const sort = document.getElementById("sort").value;

  const params = new URLSearchParams({
    genre,
    year,
    platform,
    sort
  });

  const res = await fetch(`${API}/${type}?${params.toString()}`);
  const data = await res.json();

  const cont = document.getElementById("results");
  cont.innerHTML = "";

  data.forEach(item => {
    cont.innerHTML += `
      <div class="media-card">
        <a href="/${type === 'movies' ? 'movie' : 'tv'}/${item.movieId || item.tvId}">
          <img src="${item.posterPath}">
        </a>
        <h3>${item.title}</h3>
        <p>${item.year}</p>
      </div>
    `;
  });
}

// cargar sin filtros al inicio
loadResults();
