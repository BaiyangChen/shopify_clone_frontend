# Shopify Clone – Full-Stack E-commerce Platform

This project is a full-stack Shopify-style e-commerce platform built with **Ruby on Rails (API-only)** on the backend, **React** on the frontend, and **PostgreSQL** as the database. It allows users to browse products, add them to a cart, and simulate order processing with secure login functionality.

---

## Tech Stack

- **Frontend**: React + Tailwind CSS  
- **Backend**: Ruby on Rails (API-only)  
- **Database**: PostgreSQL  
- **Authentication**: JWT (JSON Web Token)  
- **Deployment**:
  - Frontend: [Netlify]([https://www.netlify.com/](https://ornate-starburst-7d9747.netlify.app/)
  - Backend + Database: [Render](https://shopify-clone-api.onrender.com/products) *(free-tier)*

---

## Features

- User registration and login with JWT-based authentication
- Product catalog browsing
- Add to cart / remove from cart
- Order simulation with checkout flow
- Admin interface for product management (optional)
- Responsive UI with Tailwind CSS
- API integration between frontend and backend

---

## Installation (Local Development)

### 1. Backend Setup (Rails API)

```bash
cd backend
bundle install
rails db:create db:migrate
rails s
```

---

### 2. Frontend Setup (React)
```bash
cd frontend
npm install
npm start
```

## Developer Notes

If you encounter CORS issues, make sure to update config/initializers/cors.rb in your Rails API to include your frontend URL.

Render's free PostgreSQL database goes to sleep when idle — be sure to "wake it up" by visiting the backend endpoint before accessing the frontend.


## About Me
Hi! I'm Baiyang Chen, a Computer Science student based in Montreal, passionate about full-stack development.
I built this project to deepen my understanding of backend APIs, frontend integration, authentication, and cloud deployment using modern tools.

Feel free to check out more of my work or connect with me:

GitHub: https://github.com/baiyangchen

LinkedIn: https://linkedin.com/in/baiyang-chen
