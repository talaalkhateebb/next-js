# Error Handling Project – Node.js & Express

A simple REST API built with Node.js and Express that demonstrates proper error handling patterns for production-ready applications.

---

## What This Project Does

This API manages a list of items and handles errors in a clean, centralized way. Instead of crashing or returning confusing responses, every error gets caught and returned as a consistent JSON response with a status code and message.

---

## Project Structure

```
project/
├── app.js
├── controllers/
│   └── itemController.js
├── middleware/
│   └── errorHandler.js
├── routes/
│   └── itemRoutes.js
└── utils/
    └── AppError.js
```

---

## Getting Started

**Install dependencies:**
```bash
npm install
```

**Run the server:**
```bash
node app.js
```

The server runs on `http://localhost:3000`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/items` | Get all items |
| GET | `/api/items/:id` | Get a single item by ID |
| POST | `/api/items` | Create a new item |
| DELETE | `/api/items/:id` | Delete an item by ID |

---

## Error Handling

All errors follow a consistent response format:

```json
{
  "success": false,
  "errorCode": "E001",
  "message": "Name is required"
}
```

| Scenario | Status Code | Error Code |
|----------|-------------|------------|
| Missing required field | 400 | E001 |
| Item not found | 404 | E002 |
| Unexpected server error | 500 | E000 |

---

## How It Works

Each controller wraps its logic in a `try/catch` block. If something goes wrong, it calls `next(error)` which passes the error to the centralized `errorHandler` middleware. This keeps controllers clean and error logic in one place.

---

## Testing with Postman

**Get all items:**
```
GET http://localhost:3000/api/items
```

**Get item that doesn't exist (triggers 404):**
```
GET http://localhost:3000/api/items/999
```

**Create item without name (triggers 400):**
```
POST http://localhost:3000/api/items
Body: {}
```

**Create item successfully:**
```
POST http://localhost:3000/api/items
Body: { "name": "New Item" }
```

---

## Built With

- Node.js
- Express