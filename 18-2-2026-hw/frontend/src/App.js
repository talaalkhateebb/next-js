import { useState, useEffect } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import "./App.css";

export default function App() {
  const [isLoggedIn,  setIsLoggedIn]  = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Check if user is already logged in (token in localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user  = localStorage.getItem("user");
    if (token && user) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <div className="app-container">
      {isLoggedIn
        ? <Dashboard user={currentUser} onLogout={handleLogout} />
        : <Login onLoginSuccess={handleLoginSuccess} />
      }
    </div>
  );
}