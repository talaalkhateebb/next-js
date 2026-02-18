// routes/products.js
const express    = require('express');
const router     = express.Router();

const productController = require('../controllers/productController');
const validateProduct   = require('../middleware/validateProduct');

// GET  /api/products          → get all (+ search & pagination)
// GET  /api/products/:id      → get one
// POST /api/products          → create (validated)
// PUT  /api/products/:id      → full update (validated)
// PATCH /api/products/:id     → partial update
// DELETE /api/products/:id    → delete

router.get('/',     productController.getProducts);
router.get('/:id',  productController.getProductById);

router.post('/',    validateProduct, productController.createProduct);
router.put('/:id',  validateProduct, productController.updateProduct);
router.patch('/:id',                 productController.patchProduct);
router.delete('/:id',                productController.deleteProduct);

module.exports = router;