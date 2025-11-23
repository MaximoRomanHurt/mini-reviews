const reviewsContainer = document.getElementById("reviewsContainer");
const deleteModal = document.getElementById("deleteModal");
const confirmDelete = document.getElementById("confirmDelete");
const cancelDelete = document.getElementById("cancelDelete");

let deleteId = null;
const token = localStorage.getItem("token");

// =========================
// Cargar mis reseñas
// =========================
async function loadMyReviews() {
  const res = await fetch("http://localhost:3000/api/reviews/my-reviews", {
    headers: { Authorization: `Bearer ${token}` }
  });

  const reviews = await res.json();

  reviewsContainer.innerHTML = "";

  reviews.forEach(r => {
    reviewsContainer.innerHTML += `
      <div class="review-card">
        <img src="${r.movieId?.poster}" class="review-poster" />
        <div class="review-info">
          <h3>${r.movieId?.title}</h3>
          <p>${"⭐".repeat(r.stars)}</p>
          <p>${r.comment}</p>
          <button class="btn btn-danger" onclick="openDelete('${r._id}')">
            Eliminar
          </button>
        </div>
      </div>
    `;
  });
}

loadMyReviews();

// =========================
// Abrir modal
// =========================
function openDelete(id) {
  deleteId = id;
  deleteModal.classList.remove("hidden");
}

// =========================
// Cancelar modal
// =========================
cancelDelete.addEventListener("click", () => {
  deleteModal.classList.add("hidden");
  deleteId = null;
});

// =========================
// Confirmar eliminación
// =========================
confirmDelete.addEventListener("click", async () => {
  await fetch(`http://localhost:3000/api/reviews/${deleteId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });

  deleteModal.classList.add("hidden");
  loadMyReviews();
});
