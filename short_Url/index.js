import express from 'express';
import router from './routes/url.js';
import connectToMongoDB from './connect.js';
import URL from './models/url.js';
import path from 'path';
import staticRouter from './routes/staticRouter.js';

const app = express();
const PORT = 8000;


connectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log('Mongodb Connected'))
.catch((err) => console.log('MongoDB Error:', err));

app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use("/url", router);
app.use('/', staticRouter);


app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    console.log("Redirecting shortId:", shortId);

    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } },
        { new: true }
    );

    if (!entry) {
        return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectURL);
});


app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));

