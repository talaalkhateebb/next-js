# Session 24 - Deploy Next.js to Vercel

A Next.js app deployed to production on Vercel as part of the Session 24 homework.

## Live Demo

[https://4-22026hw.vercel.app/](https://my-app.vercel.app)

---

## Getting Started

```bash
git clone https://github.com/talaalkhateebb/next-js.git
cd my-app
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## Environment Variables

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_API_URL=https://api.example.com
```

On Vercel: Project Settings → Environment Variables → Redeploy

---

## Project Structure

```
app/
├── page.js
└── globals.css
```

---

## Tech Stack

- Next.js 14
- Vercel
- React 18

---

## Homework Checklist

- [x] Deploy app to Vercel
- [x] Add Environment Variables
- [x] Share Live URL

**Tala Alkhateeb**
