import { useState } from "react";
import axios from "axios";

export default function Dashboard({ user, onLogout }) {
  const [profileMsg,   setProfileMsg]   = useState("");
  const [profileError, setProfileError] = useState("");
  const [loading,      setLoading]      = useState(false);

  const testProtectedRoute = async () => {
    setProfileMsg("");
    setProfileError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfileMsg(res.data.message);
    } catch (err) {
      setProfileError(err.response?.data?.message || "Request failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    onLogout();
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-card">

        {/* ── Top bar ── */}
        <div className="dash-topbar">
          <div className="avatar">{user.name.charAt(0)}</div>
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
          <div className="topbar-actions">
            <button className="btn btn-danger" onClick={handleLogout}>
              Sign out
            </button>
          </div>
        </div>

        <div className="dash-body">

          {/* ── User Info ── */}
          <div>
            <p className="section-label">Account</p>
            <div className="info-grid">
              <div className="info-item">
                <p className="info-key">Name</p>
                <p className="info-value">{user.name}</p>
              </div>
              <div className="info-item">
                <p className="info-key">Role</p>
                <p className="info-value">
                  <span className="badge">{user.role}</span>
                </p>
              </div>
              <div className="info-item" style={{ gridColumn: "1 / -1" }}>
                <p className="info-key">Email</p>
                <p className="info-value">{user.email}</p>
              </div>
            </div>
          </div>

          {/* ── Token ── */}
          <div>
            <p className="section-label">Session Token (localStorage)</p>
            <div className="token-block">
              <p className="token-text">{localStorage.getItem("token")}</p>
            </div>
          </div>

          {/* ── Protected Route Test ── */}
          <div>
            <p className="section-label">Protected Route Test</p>
            <div className="route-test">
              <p style={{ fontSize: ".83rem", color: "var(--text-soft)" }}>
                Sends <code>GET /api/profile</code> with your Bearer token.
              </p>

              <button
                className="btn btn-ghost"
                onClick={testProtectedRoute}
                disabled={loading}
                style={{ width: "fit-content" }}
              >
                {loading ? "Requesting..." : "→ Test /api/profile"}
              </button>

              {profileMsg && (
                <div className="alert alert-success">✓ &nbsp;{profileMsg}</div>
              )}

              {profileError && (
                <div className="alert alert-error">✕ &nbsp;{profileError}</div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}