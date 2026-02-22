"use client";
import { useEffect, useState } from "react";
import "./globals.css";

function TopBar({ loaded }) {
  return (
    <div className={`topbar ${loaded ? "show" : ""}`}>
      <div className="tag">SESSION_24</div>
      <div className="status">
        <div className="dot" />
        DEPLOYED &amp; LIVE
      </div>
    </div>
  );
}

function Hero({ loaded }) {
  return (
    <div className="hero">
      <div className={`session-label ${loaded ? "show" : ""}`}>
        // WEB DEVELOPMENT BOOTCAMP
      </div>
      <h1 className={`name ${loaded ? "show" : ""}`}>
        Tala<br />
        <span className="highlight">Alkhateeb</span>
      </h1>
      <p className={`subtitle ${loaded ? "show" : ""}`}>
        Next.js app deployed to production on{" "}
        <span>Vercel</span> — environment variables configured,
        CI/CD pipeline active, live URL ready.
      </p>
    </div>
  );
}

function ProgressBar({ loaded, count }) {
  return (
    <div className={`progress-section ${loaded ? "show" : ""}`}>
      <div className="progress-label">
        <span>// DEPLOYMENT PROGRESS</span>
        <span>{count}%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${count}%` }} />
      </div>
    </div>
  );
}

const cardsData = [
  { icon: "🚀", title: "PLATFORM",  value: "Vercel",      check: "✓ LIVE"  },
  { icon: "⚙️", title: "FRAMEWORK", value: "Next.js 14",  check: "✓ BUILT" },
  { icon: "🔐", title: "ENV VARS",  value: "Configured",  check: "✓ SET"   },
];

function Cards({ loaded }) {
  return (
    <div className={`cards ${loaded ? "show" : ""}`}>
      {cardsData.map((card) => (
        <div className="card" key={card.title}>
          <span className="card-icon">{card.icon}</span>
          <div className="card-title">{card.title}</div>
          <div className="card-value">{card.value}</div>
          <div className="card-check">{card.check}</div>
        </div>
      ))}
    </div>
  );
}

const terminalLines = [
  { type: "cmd",     text: "git push origin main" },
  { type: "out",     text: "→ Pushing to GitHub..." },
  { type: "success", text: "✓ Push successful" },
  { type: "cmd",     text: "vercel --prod" },
  { type: "out",     text: "→ Building Next.js app..." },
  { type: "out",     text: "→ Setting env variables..." },
  { type: "success", text: "✓ Deployed to production" },
  { type: "cmd",     text: "echo $NEXT_PUBLIC_API_URL" },
  { type: "success", text: "https://api.example.com" },
];

function Terminal({ loaded }) {
  return (
    <div className={`terminal ${loaded ? "show" : ""}`}>
      <div className="terminal-header">
        <div className="t-dot t-red" />
        <div className="t-dot t-yellow" />
        <div className="t-dot t-green" />
        <div className="terminal-title">bash — deploy.sh</div>
      </div>
      <div className="terminal-body">
        {terminalLines.map((line, i) =>
          line.type === "cmd" ? (
            <div className="line" key={i}>
              <span className="prompt">$</span>
              <span className="cmd">{line.text}</span>
            </div>
          ) : (
            <div className={`out ${line.type === "success" ? "success" : ""}`} key={i}>
              {line.text}
            </div>
          )
        )}
      </div>
    </div>
  );
}

function Footer({ loaded }) {
  return (
    <div className={`footer ${loaded ? "show" : ""}`}>
      <div className="footer-left">
        <strong>Tala Alkhateeb</strong><br />
        Session 24 — Deploy Next.js to Vercel
      </div>
      <a className="live-btn" href="#">VIEW_LIVE →</a>
    </div>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [count, setCount]   = useState(0);

  useEffect(() => {
    setLoaded(true);
    const interval = setInterval(() => {
      setCount((c) => {
        if (c >= 100) { clearInterval(interval); return 100; }
        return c + 2;
      });
    }, 18);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="grain" />
      <div className="grid-bg" />
      <div className="glow" />

      <div className="container">
        <TopBar      loaded={loaded} />
        <Hero        loaded={loaded} />
        <ProgressBar loaded={loaded} count={count} />
        <Cards       loaded={loaded} />
        <Terminal    loaded={loaded} />
        <Footer      loaded={loaded} />
      </div>
    </>
  );
}