export default async function DashboardPage() {
  const orders = await fetch('https://jsonplaceholder.typicode.com/todos', {
    cache: 'no-store'
  }).then(r => r.json());

  return (
    <div>
      <h1>Dashboard</h1>
      {orders.slice(0, 5).map((order: any) => (
        <p key={order.id}>{order.title}</p>
      ))}
    </div>
  );
}