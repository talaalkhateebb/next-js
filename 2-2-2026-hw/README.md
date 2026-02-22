# Products App

A simple Next.js project built for learning API Routes and Server-Side Rendering.

## What this does

Fetches a list of products from an internal API route and displays them on a server-rendered page. Nothing fancy, just trying to understand how the data flows from the API to the page without touching the client.

## Stack

- Next.js 14 (App Router)
- No database yet — data is hardcoded in the route for now

## Structure

```
app/
├── api/
│   └── products/
│       └── route.js      # returns product list as JSON
├── products/
│   └── page.js           # server component, fetches and renders products
└── globals.css
```

## Running it

```bash
npm install
npm run dev
```

Open `http://localhost:3000/products`

The API itself is also accessible at `http://localhost:3000/api/products` if you want to check the raw response.

## Notes

- The page uses `cache: 'no-store'` so it always fetches fresh data
- Everything renders on the server — no useEffect, no loading states needed
- Products are stored in memory for now, so they reset on every server restart