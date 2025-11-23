// GET /api/movies (con filtros avanzados)
exports.getAll = async (req, res) => {
  try {
    const { genre, year, platform, sort } = req.query;

    const query = {};

    if (genre) query.genres = genre;
    if (year) query.year = year;
    if (platform) query.platforms = platform;

    let movies = Movie.find(query);

    // sort
    if (sort === "year") movies = movies.sort({ year: -1 });
    if (sort === "alpha") movies = movies.sort({ title: 1 });
    if (sort === "recent") movies = movies.sort({ createdAt: -1 });
    if (sort === "popularity") movies = movies.sort({ popularity: -1 });

    const result = await movies.exec();
    res.json(result);

  } catch (err) {
    res.status(500).json({ message: "Error obteniendo películas", error: err.message });
  }
};
