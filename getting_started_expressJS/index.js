import express from 'express';


const app = express();

app.get("/", (req, res) => {
    return res.send("Hello from Home page");
});

app.get("/about", (req, res) => {

    // res.send("Hey this is about page" + "hey" + req.query.name + "You are" + req.query.age);
    // http://localhost:4000/about?name=abhishek&age=25

    return res.send(`Hello ${req.query.name}`)
    // http://localhost:4000/about?name=abhishek
})




app.listen(4000, () => console.log("Server Started"));
