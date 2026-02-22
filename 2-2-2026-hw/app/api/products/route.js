
const products = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Phone", price: 599 },
  { id: 3, name: "Tablet", price: 399 },
];

export async function GET() {
  return Response.json(products);
}

export async function POST(request) {
  const body = await request.json();
  const newProduct = {
    id: products.length + 1,
    name: body.name,
    price: body.price,
  };
  products.push(newProduct);
  return Response.json(newProduct, { status: 201 });
}