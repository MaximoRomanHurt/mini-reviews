
import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  movieId: String,
  movieTitle: String,
  username: String,
  text: String,
  rating: Number,
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Review", ReviewSchema);
