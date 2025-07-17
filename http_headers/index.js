import express from 'express';
import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const user = require('./MOCK_DATA.json');

const app = express();

const PORT = 4000;

// Middleware - Plugin
app.use(express.urlencoded({extended: false}));


app.get("/users", (req, res) => {
    const html = `
        <ul>
             ${user.map(u => `<li>${u.first_name}</li>`).join("")}
        </ul>
    `;

    res.send(html);
});



// RestAPI Route
app.get("/api/users", (req, res) => {
  // console.log(req.headers);
  res.setHeader('X-myName', "Abhishek"); // custom Header
  // Always add X to custom header
    return res.json(user);
});


app
.route("/api/users/:id")
.get((req, res) => {
    const id = Number(req.params.id);
    const allUser = user.find((u) => u.id === id);
    return res.json(allUser);
})

.patch((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;

    const userIndex = user.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ status: "User not found" });
    }

    user[userIndex] = { ...user[userIndex], ...body };

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(user), (err) => {
      if (err) {
        return res.status(500).json({ status: "error", message: "Failed to update user" });
      }

      return res.json({ status: "success", updatedUser: user[userIndex] });
    });
  })



app.post("/api/users", (req, res) => {
    
    const body = req.body;
    user.push({...body, id: user.length + 1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(user), (err, data) => {
            return res.json({status : "success", id: user.length});
    });
});


app.listen(PORT, () => {
    console.log(`Server Started at PORT ${PORT}`);
});