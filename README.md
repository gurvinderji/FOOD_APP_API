# FOOD_APP_API

A simple Node.js + Express backend for a food app. Uses MongoDB (Mongoose) for data storage and JWT for authentication.

## Features

- User authentication (register / login)
- User profile (get, update, password reset/change, delete)
- Categories CRUD
- Restaurants CRUD
- Foods CRUD and queries (by restaurant, single food)
- JWT-protected routes via middleware

## Prerequisites

- Node.js (v14+ recommended)
- npm
- MongoDB (local or Atlas)

## Quick setup

1. Clone the repo and install dependencies:

```powershell
cd C:\Users\gurvi\Desktop\backend\food_app
npm install
```

2. Create a `.env` file in the project root with these variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/your-db-name
JWT_SECRET=your_jwt_secret_here
```

3. Start the server:

```powershell
npm start
# or if you use nodemon
npx nodemon server.js
```

Server will listen on the port set in `PORT` (default 5000).

## Important env variables

- `MONGODB_URI` — connection string to MongoDB
- `JWT_SECRET` — secret key for signing JWT tokens
- `PORT` — port to run the server on

## API overview

Base path in the app (depending on your `server.js` routing) is likely `/api` — combine with the module routes below.

Auth

- POST /api/auth/register — register a new user
  - Body: { name?, email, password, phone, usertype }
- POST /api/auth/login — login and receive JWT
  - Body: { email, password }

User

- GET /api/user/get-user — get current user (requires Authorization: Bearer <token>)
- PUT /api/user/update-user — update user (requires Authorization)
  - Body: { username?, address?, phone? }
- POST /api/user/update-password — change password (requires Authorization)
- POST /api/user/reset-password — reset password (requires Authorization)
- DELETE /api/user/delete-user/:id — delete a user (requires Authorization)

Category

- POST /api/category/create — create category (requires Authorization)
  - Body: { title, imageUrl }
- GET /api/category/get-all-category — list categories
- PUT /api/category/update/:id — update category (requires Authorization)
  - Body: { title?, imageUrl? }
- DELETE /api/category/delete/:id — delete category (requires Authorization)
  - Note: route also accepts `/api/category/delete` to allow missing-id handling in controller

Restaurant

- POST /api/resturant/create — create restaurant (requires Authorization)
- GET /api/resturant/getall — list restaurants
- GET /api/resturant/get/:id — get restaurant by id
- DELETE /api/resturant/delete/:id — delete restaurant (requires Authorization)

Food

- POST /api/food/create — create a food item (requires Authorization)
  - Body: { title, description, price, imageUrl, foodTags, catgeory, code, isAvailabel, resturant, rating }
- GET /api/food/get-all-foods — list all foods
- GET /api/food/get-food/:id — get single food by id (also available at `/api/food/get-food` route when id omitted)
- GET /api/food/get-food-by-resturant/:id — foods for a restaurant (also available at `/api/food/get-food-by-resturant` route when id omitted)

> Note: Some routes intentionally accept both the path with and without `:id` — when `:id` is missing the controller will return a helpful message.

## Request tips (Postman)

- For JSON bodies, set `Content-Type: application/json` and select raw → JSON in Postman.
- For protected routes, add header `Authorization: Bearer <JWT_TOKEN>`.
- Common issues:
  - `SyntaxError: Expected double-quoted property name` — your JSON in Postman is malformed (use double quotes for keys and strings, no trailing commas).
  - `Cast to ObjectId failed` — the provided `:id` is not a valid MongoDB ObjectId (should be 24 hex chars). Use IDs returned from the API list endpoints.
  - `Cannot set properties of undefined (setting 'id')` — ensure auth middleware attaches the user id correctly (middleware expects Authorization header).

## Error handling notes

- Controllers try to return clear 4xx messages for missing/invalid IDs and 500 for server errors.
- Invalid ObjectId casting is handled in several controllers and returns a 400 with a message about 24-character hex string IDs.

## Tests / verification

You can verify the flow quickly with Postman by:

1. Register a user (POST /api/auth/register)
2. Login (POST /api/auth/login) and copy the Bearer token
3. Create a category (POST /api/category/create) using Authorization header
4. Create a restaurant and food items, then use GET endpoints to confirm results

## Contributing

- Make changes on a feature branch, run tests (if added), and open a pull request.

## License

MIT
