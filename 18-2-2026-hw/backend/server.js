const express = require("express");
const cors    = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const users = [
  { id: 1, name: "Ahmed Al-Rashid", email: "ahmed@test.com", password: "1234", role: "Admin"     },
  { id: 2, name: "Sara Khalid",     email: "sara@test.com",  password: "5678", role: "Developer" },
];

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const fakeToken = `jwt.${Buffer.from(`${user.id}:${user.email}`).toString("base64")}.signature`;

  res.status(200).json({
    token: fakeToken,
    user:  { id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

app.get("/api/profile", (req, res) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  if (!token || token === "undefined") {
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }

  res.status(200).json({
    message: "Access granted. This is a protected route.",
    token,
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`\n  Server running on http://localhost:${PORT}\n`);
});