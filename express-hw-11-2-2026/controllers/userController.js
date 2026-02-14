
let users = [
  { id: 1, name: 'ahmad', email: 'ahmad@example.com' },
  { id: 2, name: 'sara', email: 'sara@example.com' },
  { id: 3, name: 'mohammad', email: 'mohammad@example.com' }
];

exports.getUsers = (req, res) => {
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
};

exports.createUser = (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name and email'
    });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  
  users.push(newUser);
  
  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: newUser
  });
};
exports.getUserById = (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === parseInt(id));
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  res.status(200).json({
    success: true,
    data: user
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(u => u.id === parseInt(id));
  
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  const deletedUser = users.splice(userIndex, 1);
  
  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
    data: deletedUser[0]
  });
};