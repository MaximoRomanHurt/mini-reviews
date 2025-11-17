
import Review from '../models/review.model.js';

export const getAll = async (req,res)=>{
  res.json(await Review.find());
};

export const getByMovie = async (req,res)=>{
  res.json(await Review.find({ movieId: req.params.movieId }));
};

export const create = async (req,res)=>{
  const r = new Review(req.body);
  await r.save();
  res.json(r);
};

export const update = async (req,res)=>{
  const r = await Review.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(r);
};

export const remove = async (req,res)=>{
  await Review.findByIdAndDelete(req.params.id);
  res.json({status:"deleted"});
};
