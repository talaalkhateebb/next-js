// controllers/productController.js
// Full CRUD + BONUS: Search & Pagination

// ── In-memory "database" ──────────────────────────────────────────────────────
let products = [
  { id: 1, name: 'Laptop',     price: 999,  category: 'Electronics', stock: 10 },
  { id: 2, name: 'Phone',      price: 599,  category: 'Electronics', stock: 25 },
  { id: 3, name: 'Desk Chair', price: 249,  category: 'Furniture',   stock: 5  },
  { id: 4, name: 'Notebook',   price: 4.99, category: 'Stationery',  stock: 100},
  { id: 5, name: 'Headphones', price: 149,  category: 'Electronics', stock: 30 },
];
let nextId = 6;

// ── READ ALL – GET /api/products ──────────────────────────────────────────────
// BONUS: ?search=  ?page=  ?limit=  ?category=
exports.getProducts = (req, res) => {
  let result = [...products];

  // 🔍 BONUS – Search by name or category
  const { search, category, page, limit } = req.query;

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }

  if (category) {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  // 📄 BONUS – Pagination
  const pageNum  = parseInt(page)  || 1;
  const limitNum = parseInt(limit) || result.length; // default: return all
  const start    = (pageNum - 1) * limitNum;
  const end      = start + limitNum;
  const paginated = result.slice(start, end);

  res.json({
    success: true,
    total:   result.length,
    page:    pageNum,
    limit:   limitNum,
    data:    paginated,
  });
};

// ── READ ONE – GET /api/products/:id ─────────────────────────────────────────
exports.getProductById = (req, res, next) => {
  const product = products.find(p => p.id === parseInt(req.params.id));

  if (!product) {
    const err = new Error(`Product with id ${req.params.id} not found.`);
    err.status = 404;
    return next(err);
  }

  res.json({ success: true, data: product });
};

// ── CREATE – POST /api/products ───────────────────────────────────────────────
exports.createProduct = (req, res) => {
  const { name, price, category, stock } = req.body;

  const newProduct = {
    id: nextId++,
    name:     name.trim(),
    price,
    category: category.trim(),
    stock:    stock || 0,
  };

  products.push(newProduct);

  res.status(201).json({
    success: true,
    message: 'Product created successfully.',
    data:    newProduct,
  });
};

// ── UPDATE (full) – PUT /api/products/:id ─────────────────────────────────────
exports.updateProduct = (req, res, next) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));

  if (index === -1) {
    const err = new Error(`Product with id ${req.params.id} not found.`);
    err.status = 404;
    return next(err);
  }

  const { name, price, category, stock } = req.body;

  products[index] = {
    ...products[index],
    name:     name.trim(),
    price,
    category: category.trim(),
    stock:    stock !== undefined ? stock : products[index].stock,
  };

  res.json({
    success: true,
    message: `Product ${req.params.id} updated successfully.`,
    data:    products[index],
  });
};

// ── PARTIAL UPDATE – PATCH /api/products/:id ──────────────────────────────────
exports.patchProduct = (req, res, next) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));

  if (index === -1) {
    const err = new Error(`Product with id ${req.params.id} not found.`);
    err.status = 404;
    return next(err);
  }

  // Only update fields that were sent
  products[index] = { ...products[index], ...req.body };

  res.json({
    success: true,
    message: `Product ${req.params.id} partially updated.`,
    data:    products[index],
  });
};

// ── DELETE – DELETE /api/products/:id ─────────────────────────────────────────
exports.deleteProduct = (req, res, next) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));

  if (index === -1) {
    const err = new Error(`Product with id ${req.params.id} not found.`);
    err.status = 404;
    return next(err);
  }

  const deleted = products.splice(index, 1)[0];

  res.json({
    success: true,
    message: `Product ${req.params.id} deleted successfully.`,
    data:    deleted,
  });
};