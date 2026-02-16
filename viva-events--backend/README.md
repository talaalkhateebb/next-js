# VIVA Events Backend API (MongoDB)

Backend API for VIVA Events using **MongoDB** as the database.

## 🗄️ Database: MongoDB

This version uses MongoDB instead of MySQL. All features are the same, but with NoSQL database.

## 📋 Features

- **User Authentication** (JWT-based)
- **Services Management** (CRUD with image upload)
- **Shopping Cart** (Add/Remove/Update items)
- **Order Management** (Create, Track, Cancel orders)
- **Role-based Access** (Customer/Admin)

## 🛠️ Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** JWT
- **Password Hashing:** bcryptjs
- **Image Processing:** Sharp
- **File Upload:** Multer

## 📦 Installation

### Prerequisites

- Node.js (v14+)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Setup Steps

1. **Extract the files**
   ```bash
   cd viva-events-backend-mongodb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```env
   PORT=5000
   
   # For local MongoDB
   MONGODB_URI=mongodb://localhost:27017/viva_events
   
   # Or for MongoDB Atlas (cloud)
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/viva_events
   
   JWT_SECRET=your_secret_key_here
   ```

4. **Start MongoDB**
   
   **Option A: Local MongoDB**
   - Install MongoDB from: https://www.mongodb.com/try/download/community
   - Or use MongoDB Compass GUI
   - Start MongoDB service:
     ```bash
     # Windows
     net start MongoDB
     
     # Mac/Linux
     mongod
     ```
   
   **Option B: MongoDB Atlas (Cloud - Free)**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Create free account
   - Create cluster
   - Get connection string
   - Update `MONGODB_URI` in `.env`

5. **Seed the database**
   ```bash
   npm run seed
   ```
   
   This creates:
   - Admin user (admin@vivaevents.com / admin123)
   - 8 sample services

6. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

7. **Test the API**
   ```
   http://localhost:5000/health
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

All endpoints are the same as MySQL version. See API_TESTING.md for details.

### Quick Test

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@vivaevents.com",
    "password": "admin123"
  }'
```

## 🗄️ Database Schema

### Collections

1. **users**
   - name, email, password (hashed)
   - phone, role (customer/admin)
   - timestamps

2. **services**
   - title, subtitle, description
   - price, currency
   - image, thumbnail
   - category, isActive
   - timestamps

3. **carts**
   - user (ref to User)
   - service (ref to Service)
   - quantity
   - timestamps

4. **orders**
   - user (ref to User)
   - items (array of {service, quantity, price})
   - totalPrice, status, notes
   - timestamps

## 🔐 Default Credentials

**Admin Account:**
- Email: `admin@vivaevents.com`
- Password: `admin123`

⚠️ Change password after first login!

## 📁 Project Structure

```
viva-events-backend-mongodb/
├── config/
│   └── database.js          # MongoDB connection
├── models/
│   ├── User.js              # User schema
│   ├── Service.js           # Service schema
│   ├── Cart.js              # Cart schema
│   └── Order.js             # Order schema
├── controllers/
│   ├── authController.js
│   ├── servicesController.js
│   ├── cartController.js
│   └── ordersController.js
├── middleware/
│   ├── auth.js
│   └── upload.js
├── routes/
│   ├── auth.js
│   ├── services.js
│   ├── cart.js
│   └── orders.js
├── scripts/
│   └── seedDatabase.js      # Database seeding
├── utils/
│   └── imageProcessor.js
├── uploads/                 # Uploaded files
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## 🚀 MongoDB vs MySQL Differences

### Advantages of MongoDB:
- ✅ **Easier setup** - No SQL commands needed
- ✅ **Flexible schema** - Easy to change structure
- ✅ **JSON-like documents** - Natural for Node.js
- ✅ **Embedded documents** - Order items stored in order
- ✅ **MongoDB Atlas** - Free cloud hosting
- ✅ **No joins** - Faster for simple queries

### Key Code Differences:
```javascript
// MySQL (SQL query)
const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

// MongoDB (Mongoose)
const user = await User.findOne({ email });
```

## 🌐 MongoDB Atlas Setup (Free Cloud)

1. **Create Account:**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Sign up (free)

2. **Create Cluster:**
   - Choose M0 (Free tier)
   - Select region closest to you
   - Create cluster

3. **Create Database User:**
   - Database Access → Add New User
   - Username: `vivaadmin`
   - Password: (generate strong password)
   - User Privileges: Read & Write

4. **Whitelist IP:**
   - Network Access → Add IP Address
   - Choose "Allow Access from Anywhere" (for development)
   - Or add your specific IP

5. **Get Connection String:**
   - Clusters → Connect → Connect Your Application
   - Copy connection string
   - Replace `<password>` with your password
   - Update `MONGODB_URI` in `.env`

Example:
```env
MONGODB_URI=mongodb+srv://vivaadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/viva_events?retryWrites=true&w=majority
```

## 🔧 MongoDB Commands

**View database:**
```bash
mongosh
use viva_events
show collections
db.users.find()
db.services.find()
```

**Using MongoDB Compass (GUI):**
- Download: https://www.mongodb.com/products/compass
- Connect to: `mongodb://localhost:27017`
- Browse collections visually

## 📊 Monitoring

**View database stats:**
```javascript
// In mongosh or Compass
db.stats()
db.users.countDocuments()
db.services.countDocuments()
db.orders.countDocuments()
```

## 🐛 Troubleshooting

### Error: MongooseServerSelectionError

**Problem:** Can't connect to MongoDB

**Solutions:**
1. Make sure MongoDB is running:
   ```bash
   # Check if running
   mongod --version
   
   # Start MongoDB
   mongod
   ```

2. Check connection string in `.env`
3. For Atlas: Check IP whitelist and credentials

### Error: ValidationError

**Problem:** Missing required fields

**Solution:** Check request body has all required fields

### Error: E11000 duplicate key

**Problem:** Trying to create duplicate entry (e.g., same email)

**Solution:** Use unique value or update instead of create

## 📝 Environment Variables

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/viva_events

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

## 🔄 Migration from MySQL

If you have data in MySQL version and want to move to MongoDB:

1. Export data from MySQL
2. Transform to JSON format
3. Use `mongoimport` or seeding script
4. Test all endpoints

## 📞 Support

For MongoDB-specific questions:
- MongoDB Docs: https://docs.mongodb.com
- MongoDB University: https://university.mongodb.com (Free courses)
- Mongoose Docs: https://mongoosejs.com

---

## ✅ Quick Start Checklist

- [ ] Node.js installed
- [ ] MongoDB running (local or Atlas)
- [ ] npm install completed
- [ ] .env file configured
- [ ] npm run seed successful
- [ ] Server started (npm run dev)
- [ ] /health endpoint works
- [ ] Can login with admin credentials

---

**Made with ❤️ for VIVA Events**
