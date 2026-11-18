# MyStore – MERN Stack E-Commerce Website

MyStore is a full-stack e-commerce application built using the MERN stack. It includes a customer frontend, a backend API, and a separate admin panel to manage products and orders.

## Project Modules

### 1. Frontend (Customer Panel)
- User Registration and Login
- Browse and search products
- View product details
- Add products to cart
- Update product quantity and remove items
- Place orders using Cash on Delivery (COD) or Razorpay
- View order history
- Light and Dark Mode
- Responsive design

### 2. Admin Panel
- Admin Login
- Admin Dashboard
- Add new products
- View all products
- Update product details
- Delete products
- View and manage customer orders
- Update order status

### 3. Backend
- REST API using Node.js and Express.js
- MongoDB database with Mongoose
- User authentication using JWT and cookies
- Product management APIs
- Cart management APIs
- Order management APIs
- Razorpay payment integration
- Admin authorization and protected routes

## Tech Stack

**Frontend:** React.js, React Router, Tailwind CSS, Axios, React Icons

**Admin Panel:** React.js, Tailwind CSS, Axios

**Backend:** Node.js, Express.js

**Database:** MongoDB, Mongoose

**Authentication:** JWT, Cookies

**Payment Gateway:** Razorpay

## Project Structure

```text
MyStore/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
│
├── admin/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
│
└── backend/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── server.js
    └── package.json
```

## Installation and Setup

### 1. Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd MyStore
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 3. Admin Panel Setup

```bash
cd admin
npm install
npm run dev
```

### 4. Backend Setup

```bash
cd backend
npm install
npm run dev
```

## Environment Variables

### Frontend `.env`

```env
VITE_BACKEND_URL=your_backend_url
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### Backend `.env`

```env
PORT=5000
NODE_ENV = development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT = 5000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## Author

Your Name

## License

This project is developed for learning and educational purposes.