import path from 'path';
import express from "express";
import multer from 'multer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8000;

const storage = multer.diskStorage({
    destination : function (req, file, cb) {
        return cb(null, "./uploads");
    },
    filename : function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
})



const upload = multer({ storage : storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended : false }));
app.use(express.static(path.join(__dirname, 'uploads'))); // to serve uploaded files

app.get("/", (req, res) => {
    return res.render("homepage", {
    profileImage : null,
    coverImage : null,
    });
});


app.post("/upload", upload.fields([{name : "profileImage", maxCount : 1}, {name : "coverImage", maxCount : 1}]), (req, res) => {
    console.log("Body :- ", req.body);
    console.log("Files :- ", req.files);

    
    const profileImage =  req.files.profileImage?.[0]?.filename || null;
    const coverImage = req.files?.coverImage?.[0]?.filename || null;
    
    return res.render("homepage", {
        profileImage,
        coverImage
    });
});

app.listen(PORT, () => {
    console.log(`Server strated at PORT : 8000`);
});