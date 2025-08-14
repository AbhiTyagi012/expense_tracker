# Personal Finance Tracker (Backend)
This is a scaffolded Express.js backend for a Personal Finance Tracker application using MongoDB (Mongoose) and Redis caching.

## Features included in this scaffold
- User auth (JWT) with roles: admin, user, read-only
- Transactions CRUD
- Category model
- Rate limiting middleware
- Basic input sanitization and security middleware suggestions

## Create an .env
- MONGO_URI=
- JWT_SECRET=

## Quick start
1. `npm install`
2. `npm run dev` (requires nodemon) or `npm start`

