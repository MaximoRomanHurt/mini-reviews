const API = "http://localhost:4000/api";
const token = localStorage.getItem("token");

if (!token) window.location.href = "/login";

async function loadProfile() {
  const res = await fetch(`${API}/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();

  // rellenar datos
  document.getElementById("usernameTxt").textContent = data.user.username;
  document.getElementById("emailTxt").textContent = data.user.email;

  document.getElementById("username").value = data.user.username;
  document.getElementById("email").value = data.user.email;
  document.getElementById("avatar").value = data.user.avatar;

  document.getElementById("avatarImg").src = data.user.avatar;

  // stats
  document.getElementById("totalReviews").textContent = data.stats.totalReviews;
  document.getElementById("avgStars").textContent = data.stats.avgStars;
  document.getElementById("watchlistCount").textContent = data.stats.watchlistCount;
}

loadProfile();

// ACTUALIZAR PERFIL
document.getElementById("updateForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const body = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    avatar: document.getElementById("avatar").value
  };

  const res = await fetch(`${API}/profile/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });

  const d = await res.json();

  alert(d.message);
  loadProfile();
});

// CAMBIAR PASSWORD
document.getElementById("passwordForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const body = {
    currentPassword: document.getElementById("currentPassword").value,
    newPassword: document.getElementById("newPassword").value
  };

  const res = await fetch(`${API}/profile/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });

  const d = await res.json();
  alert(d.message);
});
