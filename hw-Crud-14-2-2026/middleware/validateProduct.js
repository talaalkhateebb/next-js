// middleware/validateProduct.js
// Validation is NOT the controller's job — it lives here as middleware

const validateProduct = (req, res, next) => {
  const { name, price, category } = req.body;
  const errors = [];

  // name: required, min 2 chars
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name is required and must be at least 2 characters.' });
  }

  // price: required, must be a positive number
  if (price === undefined || price === null) {
    errors.push({ field: 'price', message: 'Price is required.' });
  } else if (typeof price !== 'number' || price < 0) {
    errors.push({ field: 'price', message: 'Price must be a positive number.' });
  }

  // category: required
  if (!category || typeof category !== 'string' || category.trim().length < 2) {
    errors.push({ field: 'category', message: 'Category is required.' });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid input',
      errors,
    });
  }

  next(); // All good — pass to controller
};

module.exports = validateProduct;