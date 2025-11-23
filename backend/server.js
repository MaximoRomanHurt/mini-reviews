// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Rutas
const moviesRoutes = require('./routes/movies.routes');
const reviewsRoutes = require('./routes/reviews.routes');
app.use('/api/reviews', reviewsRoutes);

const tvshowsRoutes = require('./routes/tvshows.routes');

app.use('/api/movies', moviesRoutes);
if (reviewsRoutes) app.use('/api/reviews', reviewsRoutes);
app.use('/api/tvshows', tvshowsRoutes);

app.get('/', (req, res) => res.send('API Movies & TVShows activa'));

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Backend escuchando en http://localhost:${PORT}`));
  } catch (err) {
    console.error('Error arrancando servidor:', err);
    process.exit(1);
  }
})();
// Al inicio del archivo:
const authRoutes = require('./routes/auth.routes');

// Luego de app.use(express.json()):
app.use('/api/auth', authRoutes);

const profileRoutes = require('./routes/profile.routes');
app.use('/api/profile', profileRoutes);

const watchlistRoutes = require('./routes/watchlist.routes');
app.use('/api/watchlist', watchlistRoutes);

const searchRoutes = require('./routes/search.routes');
app.use('/api/search', searchRoutes);
