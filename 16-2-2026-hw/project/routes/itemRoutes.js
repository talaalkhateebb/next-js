import express from 'express';
import {
  getAllItems,
  getItemById,
  createItem,
  deleteItem,
} from '../controllers/itemController.js';

const router = express.Router();

router.get('/', getAllItems);
router.get('/:id', getItemById);
router.post('/', createItem);
router.delete('/:id', deleteItem);

export default router;