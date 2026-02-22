export default async function BlogPage() {
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'force-cache'
  }).then(r => r.json());

  return (
    <div>
      <h1>Blog</h1>
      {posts.slice(0, 5).map((post: any) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}