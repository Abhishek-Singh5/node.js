# 🔐 User Authentication System

This project implements a complete **User Authentication System** using the **Stack (MongoDB, Express.js, Node.js)** with features like user registration, login, secure session management using cookies, and URL shortening service.

---

## ✨ Features

- 📝 **User Signup and Login** using email and password.
- 🔒 **Session Management** using UUID and cookies.
- 🧠 **In-Memory Session Store** using JavaScript Map (for demo; replaceable with Redis).
- 📦 **MongoDB integration** using Mongoose for persistent user and URL data.
- 🌐 **URL Shortener** integrated with authentication system.
- 🎯 **Access control** middleware to restrict or check authentication for specific routes.
- 📊 **Click analytics** for each short URL (timestamp-based tracking).

---

## 📁 Project Structure

```
authentication-app/
│
├── controllers/            # Request handlers (user, URL)
├── middlewares/            # Authentication middleware
├── models/                 # Mongoose schemas (User, URL)
├── routes/                 # Route files for user and URL
├── service/                # Session store helper (setUser, getUser)
├── views/                  # EJS templates for signup, login, homepage
├── index.js                # Main server entry point
└── package.json            # Project metadata and dependencies
```

---

## 🔐 How Authentication Works

1. **Signup**: User enters name, email, and password. Details are saved in MongoDB.
2. **Login**: Credentials are validated. If valid:
   - A session ID is created using `uuid.v4()`.
   - User is stored in a session map (`Map()`), simulating a session store.
   - A `uid` cookie is set in the browser.
3. **Protected Routes**: Middleware checks if the cookie exists and matches a valid session.
4. **Logout**: Remove cookie and session from store (Not implemented but extendable).

---

## 📊 Click Analytics

- Each time someone accesses a short URL, we store a timestamp in `visitHistory[]` in MongoDB.
- Analytics route `/url/analytics/:shortId` shows total clicks and visit data.

---

## 🛠️ Technologies Used

- **Node.js + Express.js** — Server-side and REST API
- **MongoDB + Mongoose** — Database and schema management
- **UUID** — Session ID generation
- **EJS** — Frontend templating
- **Cookie-parser** — To read browser cookies

---

## 🚀 Getting Started

1. Clone this repo:
```bash
git clone https://github.com/Abhishek-Singh5/Authentication.git
cd authentication
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment (Optional `.env`)
```bash
PORT=8000
MONGO_URL=mongodb://localhost:27017/short-url
```

4. Start the server:
```bash
npm start
```

---

## 🧠 Future Enhancements

- JWT-based auth flow (alternative to cookies)
- Redis for session storage
- Logout functionality

---

## 📄 License

MIT License © 2025 Abhishek Singh