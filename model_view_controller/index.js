import express from 'express';
import router from './routes/user.js';
import connectMongoDb from './connection.js';
import logReqRes from './middlewares/index.js';

const app = express();
const PORT = 4000;


// connections
connectMongoDb("mongodb://127.0.0.1:27017/node-with-mongoDB")
.then(() => {
  console.log("MongoDB Connected !!");
})



// Middleware - Plugin
app.use(express.urlencoded({extended: false}));
app.use(logReqRes("log.txt"));



// Routes
app.use('/api/users', router);



// Server Start
app.listen(PORT, () => {
    console.log(`Server Started at PORT ${PORT}`);
});