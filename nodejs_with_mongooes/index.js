import express from 'express';
import mongoose from 'mongoose';


const app = express();
const PORT = 4000;

// connections

mongoose.connect("mongodb://127.0.0.1:27017/node-with-mongoDB")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB Error", err));


// Schema

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  gender: {
    type: String,
    required: true,
  },

  job_Title: {
    type: String,
  }
}, { timestamps : true }
);


// Model
const User = mongoose.model("user", userSchema);





// Middleware - Plugin
app.use(express.urlencoded({extended: false}));


app.get("/users", async (req, res) => {
  const users = await User.find({});
    const html = `
        <ul>
             ${users.map(u => `<li>${u.firstName} - ${u.email}</li>`).join("")}
        </ul>
    `;

    res.send(html);
});

// RestAPI Route
app.get("/api/users", async (req, res) => {
  const users = await User.find({});
  return res.json(users);
})


// app
.route("/api/users/:id")
.get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({error: "user not found"});
    return res.json(user);
})

.patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"})
    return res.json({status: "success"});
  })

 .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    return res.json({status : "success"});
  });




app.post("/api/users", async (req, res) => {

  const body = req.body;

  if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
    return res.status(400).json({msg : "All fields are required"});
  }
    
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    job_Title: body.job_title,
  });

  // console.log("result", result);
  return res.status(201).json({msg: "success"});
});



// Server Start

app.listen(PORT, () => {
    console.log(`Server Started at PORT ${PORT}`);
});