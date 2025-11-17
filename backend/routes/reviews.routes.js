
import express from 'express';
import { getAll, getByMovie, create, update, remove } from '../controllers/reviews.controller.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:movieId', getByMovie);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
