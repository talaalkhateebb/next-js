

export default async function ProductsPage() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  const products = await res.json();

  const totalValue = products.reduce((sum, p) => sum + p.price, 0);
  const avgPrice = Math.round(totalValue / products.length);

  return (
    <main>
      {/* Header */}
      <div className="page-header">
        <span className="label">API Route + SSR</span>
        <h1>Products Catalog</h1>
        <p>Data fetched server-side via API Route</p>
        <span className="ssr-tag">Rendered on Server</span>
      </div>

      {/* Stats */}
      <div className="stats-bar">
        <div className="stat">
          <span className="stat-num">{products.length}</span>
          <span className="stat-label">Total Products</span>
        </div>
        <div className="stat">
          <span className="stat-num">${totalValue}</span>
          <span className="stat-label">Total Value</span>
        </div>
        <div className="stat">
          <span className="stat-num">${avgPrice}</span>
          <span className="stat-label">Avg Price</span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="card-id">#{String(product.id).padStart(3, "0")}</div>
            <div className="card-name">{product.name}</div>
            <div className="card-price">${product.price}</div>
            <div className="card-footer">
              <span className="badge badge-success">In Stock</span>
              <div className="card-arrow">→</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}