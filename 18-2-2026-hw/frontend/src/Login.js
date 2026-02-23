import { useState } from "react";
import axios from "axios";

export default function Login({ onLoginSuccess }) {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user",  JSON.stringify(res.data.user));
      onLoginSuccess(res.data.user);

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (e, demoEmail, demoPass) => {
    e.preventDefault();
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        <div className="login-header">
          <div className="brand-mark">⚡</div>
          <h1>Welcome back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">

          <div className="field-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="alert alert-error" role="alert">
              ✕ &nbsp;{error}
            </div>
          )}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>

        </form>

        <div className="credentials">
          <p>Test accounts — click to fill:</p>
          <p>
            <a href="#" onClick={(e) => fillDemo(e, "ahmed@test.com", "1234")}>
              ahmed@test.com
            </a>
            &nbsp;/ <code>1234</code>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="#" onClick={(e) => fillDemo(e, "sara@test.com", "5678")}>
              sara@test.com
            </a>
            &nbsp;/ <code>5678</code>
          </p>
        </div>

      </div>
    </div>
  );
}