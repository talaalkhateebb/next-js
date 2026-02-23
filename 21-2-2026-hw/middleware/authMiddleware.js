import jwt from 'jsonwebtoken';

// ─────────────────────────────────────────────
// @desc    Middleware to protect private routes
//          Checks for a valid Bearer token in the
//          Authorization header before allowing access
// ─────────────────────────────────────────────
export const protect = (req, res, next) => {
  // Read the Authorization header (expected format: "Bearer <token>")
  const authHeader = req.headers.authorization;

  // Reject if no Authorization header is present
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.',
    });
  }

  // Extract the token (remove the "Bearer " prefix)
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using the secret key
    // If valid → decoded contains the payload we signed (id, email)
    // If invalid or expired → throws an error → caught below
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user data to req.user for use in route handlers
    req.user = decoded;

    // Pass control to the next middleware or route handler
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.',
    });
  }
};