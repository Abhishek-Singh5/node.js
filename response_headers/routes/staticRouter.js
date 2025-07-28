import express from 'express';
import URL from '../models/url.js';

const staticRouter = express.Router();

staticRouter.get('/', async (req, res) => {
  if(!req.user) return res.redirect("/login");
  const urls = await URL.find({createdBy: req.user._id});
  return res.render("home", { urls, id : null }); 
});


staticRouter.get("/signup", (req, res) => {
  return res.render("signup");
});

staticRouter.get("/login", (req, res) => {
  return res.render("login");
});

export default staticRouter;