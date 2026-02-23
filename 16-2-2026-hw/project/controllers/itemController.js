import AppError from '../utils/AppError.js';

let items = [
  { id: 1, name: 'Item One' },
  { id: 2, name: 'Item Two' },
];

export const getAllItems = (req, res) => {
  res.json({ success: true, data: items });
};

export const getItemById = (req, res, next) => {
  try {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) throw new AppError('Item not found', 404, 'E002');
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

export const createItem = (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) throw new AppError('Name is required', 400, 'E001');

    const newItem = { id: items.length + 1, name };
    items.push(newItem);
    res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    next(err);
  }
};

export const deleteItem = (req, res, next) => {
  try {
    const index = items.findIndex(i => i.id === parseInt(req.params.id));
    if (index === -1) throw new AppError('Item not found', 404, 'E002');

    items.splice(index, 1);
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    next(err);
  }
};