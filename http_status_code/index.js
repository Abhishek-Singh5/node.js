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

app.get("/email", (req, res) => {
    const html = `
        <ul>
             ${user.map(u => `<li>${u.email}</li>`).join("")}
        </ul>
    `;

    res.send(html);
});



// RestAPI Route
app.get("/api/users", (req, res) => {
    return res.json(user);
});


app
.route("/api/users/:id")
.get((req, res) => {
    const id = Number(req.params.id);
    const allUser = user.find((u) => u.id === id);
    if(!allUser) return res.status(404).json({error : "user not found"});
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

 .delete((req, res) => {
    const id = Number(req.params.id);

    const userIndex = user.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ status: "User not found" });
    }

    user.splice(userIndex, 1);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(user), (err) => {
      if (err) {
        return res.status(500).json({ status: "error", message: "Failed to delete user" });
      }

      return res.json({ status: "success", message: `User with id ${id} deleted.` });
    });
  });




app.post("/api/users", (req, res) => {

  const body = req.body;

  if(!body || !body.first_name || !body.last_name || !body.email  || !body.gender  || !body.job_title){
    return res.status(400).json({msg : "All fields are required"});
  }
    
    
    user.push({...body, id: user.length + 1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(user), (err, data) => {
            return res.status(201).json({status : "success", id: user.length});
    });
});



app.listen(PORT, () => {
    console.log(`Server Started at PORT ${PORT}`);
});