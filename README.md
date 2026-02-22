# Store API

REST API for a product store with authentication and shopping cart functionality.

## Tech Stack

- Node.js + Express
- TypeScript

## Installation

```bash
npm install
npm run dev
```

Server runs on `http://localhost:3000`

## API Endpoints

### Products

#### Get All Products
```
GET /products
```

**Query Parameters:**
- `limit` (optional): Number of products to return (default: 10)
- `offset` (optional): Pagination offset (default: 0)
- `category` (optional): Filter by category
- `brand` (optional): Filter by brand

**Response:**
```json
{
  "products": [...],
  "total": 5,
  "limit": 10,
  "offset": 0
}
```

#### Get Product by ID
```
GET /products/:id
```

**Response:**
```json
{
  "id": "001",
  "name": "Wireless Headphones",
  "price": 79.99,
  ...
}
```

### Authentication

#### Login
```
POST /users/login
```

**Body:**
```json
{
  "username": "johndoe",
  "password": "a1b2c3d4"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "001",
    "username": "johndoe",
    ...
  },
  "token": "abc123..."
}
```

### Cart

#### Get Cart Products
```
GET /cart
```

**Query Parameters:**
- `items`: JSON string con un array de objetos `{ productId, quantity }`

**Example:**
```
GET /cart?items=[{"productId":"001","quantity":2},{"productId":"002","quantity":1},{"productId":"003","quantity":1}]
```

**Response:**
```json
{
  "validProducts": [...],
  "total": 2
}
```

#### Purchase Products
```
POST /cart/purchase
```

**Headers:**
```
Authorization: Bearer {token}
```

**Body:**
```json
{
  "items": [
    { "productId": "001", "quantity": 2 },
    { "productId": "002", "quantity": 1 }
  ]
}
```

**Response:**
```json
{
  "message": "Purchase completed successfully",
  "purchase": {
    "id": "xyz789",
    "userId": "001",
    "items": [...],
    "totalAmount": 159.98,
    "purchaseDate": "2026-02-15T10:30:00.000Z"
  }
}
```

#### Get User Purchases
```
GET /cart/purchases
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "purchases": [...],
  "total": 3
}
```

## Authentication

Protected endpoints require an `Authorization` header with a Bearer token obtained from the login endpoint:

```
Authorization: Bearer {your-token-here}
```