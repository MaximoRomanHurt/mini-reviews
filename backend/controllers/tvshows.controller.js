exports.getAll = async (req, res) => {
  try {
    const { genre, year, platform, sort } = req.query;

    const query = {};
    if (genre) query.genres = genre;
    if (year) query.year = year;
    if (platform) query.platforms = platform;

    let shows = TVShow.find(query);

    if (sort === "year") shows = shows.sort({ year: -1 });
    if (sort === "alpha") shows = shows.sort({ title: 1 });
    if (sort === "recent") shows = shows.sort({ createdAt: -1 });
    if (sort === "popularity") shows = shows.sort({ popularity: -1 });

    const result = await shows.exec();
    res.json(result);

  } catch (err) {
    res.status(500).json({ message: "Error obteniendo series", error: err.message });
  }
};
