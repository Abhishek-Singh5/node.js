import express from 'express';
import URL from '../models/url.js';
import { restrictTo } from '../middlewares/auth.js';

const staticRouter = express.Router();

staticRouter.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  const urls = await URL.find({});
  return res.render("home", { urls : urls, }); 
})

staticRouter.get('/', restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  const urls = await URL.find({createdBy: req.user._id});
  return res.render("home", { urls : urls }); 
});


staticRouter.get("/signup", (req, res) => {
  return res.render("signup");
});

staticRouter.get("/login", (req, res) => {
  return res.render("login");
});

export default staticRouter;