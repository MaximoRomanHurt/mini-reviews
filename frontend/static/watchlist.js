const API = "http://localhost:4000/api";
const token = localStorage.getItem("token");

if (!token) window.location.href = "/login";

async function loadWatchlist() {
  const res = await fetch(`${API}/watchlist`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const list = await res.json();

  const container = document.getElementById("watchlistContainer");
  container.innerHTML = "";

  list.forEach(item => {
    container.innerHTML += `
      <div class="media-card">
        <img src="${item.poster}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>${item.year}</p>

        <button class="btn btn-danger" onclick="removeItem('${item.itemId}')">
          Quitar
        </button>
      </div>
    `;
  });
}

loadWatchlist();

async function removeItem(id) {
  await fetch(`${API}/watchlist/remove/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  loadWatchlist();
}
