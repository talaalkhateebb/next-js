
exports.protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  console.log('Checking authentication...');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized. Please provide a valid token',
      hint: 'Use: Authorization: Bearer mysecrettoken123'
    });
  }

  const token = authHeader.split(' ')[1];
  if (token === 'mysecrettoken123') {
    console.log('Token is valid. Access granted!');
    next(); 
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};


exports.logger = (req, res, next) => {
  const timestamp = new Date().toLocaleString('ar-JO');
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
};

exports.validateUser = (req, res, next) => {
  const { name, email } = req.body;
  
  if (!name || name.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Name is required'
    });
  }
  
  if (!email || !email.includes('@')) {
    return res.status(400).json({
      success: false,
      message: 'Valid email is required'
    });
  }
  
  next();
};