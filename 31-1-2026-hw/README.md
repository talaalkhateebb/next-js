# Next.js Data Fetching Project

A simple Next.js app that shows the difference between static and server-side data fetching.

## What's Inside

- **Blog page** — fetches posts at build time (static)
- **Dashboard page** — fetches orders on every request (server-side)

## Getting Started

Make sure you have Node 18 or higher, then run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages

| Page | Route | Strategy |
|------|-------|----------|
| Home | `/` | Static |
| Blog | `/blog` | Static (`cache: 'force-cache'`) |
| Dashboard | `/dashboard` | Server-side (`cache: 'no-store'`) |

## Why These Strategies?

**Blog → Static**
The blog content doesn't change that often. Generating it at build time means faster load speeds and better SEO, since the HTML is ready before the user even makes a request.

**Dashboard → Server-side**
The dashboard shows live data like orders and user activity. It needs to be fresh on every visit, so fetching on each request makes more sense here even if it's a bit slower.

## Project Structure

```
├── app/
│   ├── page.tsx              # Home (static)
│   ├── layout.tsx
│   ├── globals.css
│   ├── blog/
│   │   └── page.tsx          # Blog (force-cache)
│   └── dashboard/
│       └── page.tsx          # Dashboard (no-store)
├── public/
└── next.config.ts
```

## Tech Stack

- [Next.js](https://nextjs.org/)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) — used as a mock API for testing

## Resources

- [Next.js Data Fetching Docs](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Next.js Rendering Docs](https://nextjs.org/docs/app/building-your-application/rendering)