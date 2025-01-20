# Course Selling App

A RESTful API backend for a course marketplace platform where admins can create and manage courses, and users can browse and purchase courses. Built with Node.js, Express, and MongoDB.

## Features

- Secure authentication and role-based authorization (Admin vs. User)
- Course creation, updating, and deletion (Admin)
- Course browsing and purchasing (User)
- RESTful API architecture

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)

## Project Structure

```
course-selling-app/
├── db/
│   ├── userModel.js
│   └── courseModel.js
├── server/
│   ├── controllers/
│   │   ├── adminController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── validateUserDetails.js
│   │   ├── validateCourseDetails.js
│   │   ├── verifyAdmin.js
│   │   └── verifyUser.js
│   ├── routes/
│   │   ├── adminRouter.js
│   │   └── userRouter.js
│   ├── services/
│   │   ├── signupService.js
│   │   └── loginService.js
│   └── index.js
├── package.json
└── .env
```

## Database Models

### User Model

```javascript
{
  username: String,
  password: String,
  is_admin: Boolean,
  purchasedCourses: [ObjectId]
}
```

### Course Model

```javascript
{
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean
}
```

## Example Workflow

1. **Create an admin account**

   ```bash
   curl -X POST http://localhost:3000/admin/signup \
     -H "Content-Type: application/json" \
     -d '{"username": "admin123", "password": "Admin123"}'
   ```

2. **Admin login and get token**

   ```bash
   curl -X POST http://localhost:3000/admin/login \
     -H "Content-Type: application/json" \
     -d '{"username": "admin123", "password": "Admin123"}' \
     -i
   ```

   Copy the token from the `Authorization` header

3. **Create a course (using admin token)**

   ```bash
   curl -X POST http://localhost:3000/admin/courses \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <admin_token>" \
     -d '{
       "title": "Sample course",
       "description": "This is a course",
       "price": 99.99,
       "imageLink": "https://example.com/nodejs.jpg",
       "published": true
     }'
   ```

4. **Create a user account**

   ```bash
   curl -X POST http://localhost:3000/users/signup \
     -H "Content-Type: application/json" \
     -d '{"username": "student1", "password": "Student123"}'
   ```

5. **User login**

   ```bash
   curl -X POST http://localhost:3000/users/login \
     -H "Content-Type: application/json" \
     -d '{"username": "student1", "password": "Student123"}' \
     -i
   ```

6. **Browse courses**

   ```bash
   curl -X GET http://localhost:3000/users/courses \
     -H "Authorization: Bearer <user_token>"
   ```

7. **Purchase a course**

   ```bash
   curl -X POST http://localhost:3000/users/courses/<courseId> \
     -H "Authorization: Bearer <user_token>"
   ```

8. **View purchased courses**
   ```bash
   curl -X GET http://localhost:3000/users/purchasedCourses \
     -H "Authorization: Bearer <user_token>"
   ```

## Setup & Installation

1. **Clone repository**

   ```bash
   git clone https://github.com/sujal-taneja/course-selling-app.git
   cd course-selling-app
   npm install
   ```

2. **Create environment file**

   Create a `.env` file in the root directory with the following variables:

   ```env
   PORT=3000
   MONGO_URL=mongodb://localhost:27017/course-selling-app
   JWT_SECRET=your_super_secret_jwt_key_here
   ROUNDS=10
   ```

3. **Start MongoDB**

   Run locally or use connection string from MongoDB Atlas

   ```bash
   docker run --name course-selling-app -d -p 27017:27017 mongo
   ```

4. **Run the application**

   ```bash
   npm start
   ```

   The server will start on the port specified in the `.env` file
