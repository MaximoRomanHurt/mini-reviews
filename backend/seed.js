// backend/seed.js
// Seed demo para Movies y TVShows
// Referencia de requerimientos: /mnt/data/HU.txt

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Movie = require('./models/movie.model');
const TVShow = require('./models/tvshow.model');

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('Falta MONGODB_URI en .env. Edita backend/.env y vuelve a ejecutar.');
  process.exit(1);
}

const sampleMovies = [
  {
    movieId: 'tt-action-001',
    title: 'Rápido y Furioso: Demo',
    year: 2021,
    genres: ['Action'],
    platforms: ['Netflix'],
    posterPath: '/images/poster-fast.jpg',
    backdropPath: '/images/back-fast.jpg',
    overview: 'Acción demo con autos y persecuciones.',
    popularity: 78
  },
  {
    movieId: 'tt-drama-001',
    title: 'Drama Profundo',
    year: 2018,
    genres: ['Drama'],
    platforms: ['HBO'],
    posterPath: '/images/poster-drama.jpg',
    backdropPath: '/images/back-drama.jpg',
    overview: 'Historia emotiva y profunda.',
    popularity: 54
  },
  {
    movieId: 'tt-comedy-001',
    title: 'Comedia Demo',
    year: 2020,
    genres: ['Comedy'],
    platforms: ['Netflix'],
    posterPath: '/images/poster-comedy.jpg',
    backdropPath: '/images/back-comedy.jpg',
    overview: 'Risas aseguradas.',
    popularity: 60
  }
];

const sampleTV = [
  {
    showId: 'tv-001',
    title: 'Serie Demo 1',
    year: 2020,
    genres: ['Drama'],
    platforms: ['Netflix'],
    posterPath: '/images/tv1-poster.jpg',
    backdropPath: '/images/tv1-backdrop.jpg',
    overview: 'Primera serie demostrativa con intriga y buen guion.',
    seasons: [
      { seasonNumber: 1, episodeCount: 10 },
      { seasonNumber: 2, episodeCount: 8 }
    ],
    popularity: 88
  },
  {
    showId: 'tv-002',
    title: 'Serie Demo 2',
    year: 2023,
    genres: ['Action'],
    platforms: ['Prime'],
    posterPath: '/images/tv2-poster.jpg',
    backdropPath: '/images/tv2-backdrop.jpg',
    overview: 'Segunda serie demostrativa, cargada de acción y efectos.',
    seasons: [
      { seasonNumber: 1, episodeCount: 6 }
    ],
    popularity: 66
  }
];

async function runSeed() {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Conectado a MongoDB para seed.');

  try {
    // Crear movies de ejemplo
    for (const m of sampleMovies) {
      const exists = await Movie.findOne({ movieId: m.movieId });
      if (!exists) {
        await Movie.create(m);
        console.log('Movie creada:', m.movieId);
      } else {
        console.log('Movie existe:', m.movieId);
      }
    }

    // Crear TVShows de ejemplo
    for (const s of sampleTV) {
      const exists = await TVShow.findOne({ showId: s.showId });
      if (!exists) {
        await TVShow.create(s);
        console.log('TVShow creada:', s.showId);
      } else {
        console.log('TVShow existe:', s.showId);
      }
    }

    console.log('Seed completado.');
  } catch (err) {
    console.error('Error en seed:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

runSeed();
