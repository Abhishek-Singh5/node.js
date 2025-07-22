# 🔗 URL Shortener with Analytics

A simple and elegant **URL Shortener** built using **Node.js**, **Express**, **MongoDB**, and **EJS** for templating. Users can shorten long URLs, track visit analytics, and manage redirections.

---

## 🚀 Features

- ✅ Generate unique shortened URLs
- 📈 Track total click analytics for each short link
- 🔁 Redirect short URLs to original links with visit history logging
- 💡 Beautiful and responsive UI using EJS templating and modern CSS
- 💾 MongoDB for persistent storage of URLs and analytics

---

## 🛠 Tech Stack

| Frontend | Backend | Database | Templating | Misc |
|----------|---------|----------|------------|------|
| HTML5, CSS3 | Node.js, Express.js | MongoDB (Mongoose) | EJS | nanoid, path, dotenv |

---

## 📁 Project Structure

```
short-url/
├── controllers/
│   └── url.js              # Logic to handle URL creation and analytics
├── models/
│   └── url.js              # Mongoose schema and model for storing URLs
├── routes/
│   ├── url.js              # Routes for URL generation and analytics
│   └── staticRouter.js     # Route to render home page with table of URLs
├── views/
│   └── home.ejs            # UI for entering and viewing short URLs
├── connect.js              # MongoDB connection logic
├── index.js                # App entry point
├── package.json            # Dependencies and script
```

---

## 🌐 How It Works

1. User submits a long URL via the form.
2. Server generates a short ID using `nanoid`.
3. MongoDB stores:
   - Short ID
   - Original URL
   - Visit History
4. When short URL is visited, it redirects and logs timestamp.
5. Analytics can be viewed using `/url/analytics/:shortId` endpoint.

---

## 🔄 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/url` | Create a short URL |
| `GET` | `/url/analytics/:shortId` | Get analytics for a specific short URL |
| `GET` | `/:shortId` | Redirect to original URL |
| `GET` | `/` | Render home UI with URL list |

---

## 💻 Local Setup

```bash
# Clone Repo
git clone https://github.com/Abhishek-Singh5/node.js/short_Url

# Navigate into folder
cd short_Url

# Install dependencies
npm install

# Start MongoDB locally or use MongoDB Atlas

# Run Server
npm start
```

---

## 📌 Environment Setup (.env)

```
PORT=8000
MONGO_URL=mongodb://localhost:27017/short-url
```

---

---

## ✨ Credits

Built with ❤️ by Abhishek Singh using Node.js + MongoDB

---

## 📜 License

This project is licensed under the MIT License.
