import express from 'express';
import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const user = require('./MOCK_DATA.json');

const app = express();

const PORT = 4000;

// Middleware - Plugin
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
  
  fs.appendFile( "log.txt", `\n ${Date.now()} : ${req.ip} : ${req.method} : ${req.path}`, (err, data) => {
    next();
  })

  next();
});













// app.use((req, res, next) => {
//   console.log("Hello from middleware1");
//   req. userName = "Abhishek.ai"
//   // return res.json({msg : "Hello from middleware1"});
//   next();
// });










// app.use((req, res, next) => {
//   console.log("I am in get route", req.userName);
//    next();
// });


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
  // console.log("Hello I am in get route", req.userName);
    return res.json(user);
});


app
.route("/api/users/:id")
.get((req, res) => {
    const id = Number(req.params.id);
    const allUser = user.find((u) => u.id === id);
    return res.json(allUser);
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
